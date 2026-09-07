/**
 * Satu-satunya tempat frontend bicara dengan portfolio-api.
 *
 * Access token disimpan di localStorage supaya sesi admin bertahan saat
 * halaman di-refresh. Refresh token ada di cookie httpOnly milik API — tidak
 * bisa dibaca JavaScript, jadi tetap aman meski access token bocor.
 */

export const API_URL = (import.meta.env.VITE_API_URL || 'http://localhost:4551').replace(/\/$/, '');

const TOKEN_KEY = 'portfolio_admin_token';

export const tokenStore = {
  get: () => localStorage.getItem(TOKEN_KEY),
  set: (token) => localStorage.setItem(TOKEN_KEY, token),
  clear: () => localStorage.removeItem(TOKEN_KEY),
};

export class ApiError extends Error {
  constructor(status, message, details) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.details = details;
  }

  /** { email: "Email tidak valid" } — siap dipasang ke error per field di form. */
  get fieldErrors() {
    if (!Array.isArray(this.details)) return {};
    return this.details.reduce((acc, item) => ({ ...acc, [item.field]: item.message }), {});
  }
}

async function parse(response) {
  const text = await response.text();
  if (!text) return null;
  try {
    return JSON.parse(text);
  } catch {
    throw new ApiError(response.status, 'Response dari server bukan JSON yang valid');
  }
}

/** Dipanggil saat refresh token juga sudah tidak berlaku. */
let onSessionExpired = () => {};
export function setSessionExpiredHandler(handler) {
  onSessionExpired = handler;
}

// Kalau beberapa request 401 berbarengan, cukup satu panggilan refresh —
// sisanya menunggu hasil yang sama.
let refreshPromise = null;

async function refreshAccessToken() {
  if (!refreshPromise) {
    refreshPromise = (async () => {
      try {
        const response = await fetch(`${API_URL}/api/auth/refresh`, {
          method: 'POST',
          credentials: 'include',
        });
        if (!response.ok) return null;
        const json = await parse(response);
        const token = json?.data?.accessToken;
        if (token) tokenStore.set(token);
        return token ?? null;
      } catch {
        return null;
      } finally {
        // Dilepas di tick berikutnya supaya pemanggil yang antre sempat membaca.
        setTimeout(() => {
          refreshPromise = null;
        }, 0);
      }
    })();
  }
  return refreshPromise;
}

async function send(method, path, { body, auth = false, isFormData = false } = {}, isRetry = false) {
  const headers = {};
  if (!isFormData && body !== undefined) headers['Content-Type'] = 'application/json';
  if (auth) {
    const token = tokenStore.get();
    if (token) headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${API_URL}${path}`, {
    method,
    headers,
    credentials: 'include',
    body: isFormData ? body : body !== undefined ? JSON.stringify(body) : undefined,
  });

  if (response.status === 401 && auth && !isRetry) {
    const token = await refreshAccessToken();
    if (token) return send(method, path, { body, auth, isFormData }, true);

    tokenStore.clear();
    onSessionExpired();
    throw new ApiError(401, 'Sesi berakhir, silakan login lagi');
  }

  if (response.status === 204) return null;

  const json = await parse(response);

  if (!response.ok || json?.success === false) {
    throw new ApiError(
      response.status,
      json?.error?.message ?? `Request gagal (${response.status})`,
      json?.error?.details,
    );
  }

  return json;
}

function buildQuery(params = {}) {
  const search = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') search.set(key, value);
  });
  const query = search.toString();
  return query ? `?${query}` : '';
}

/** Endpoint publik — tanpa token, dipakai website. */
export const publicApi = {
  bootstrap: () => send('GET', '/api/public/bootstrap').then((r) => r.data),
  projectBySlug: (slug) => send('GET', `/api/public/projects/${slug}`).then((r) => r.data),
  sendMessage: (payload) => send('POST', '/api/messages', { body: payload }).then((r) => r.data),
};

/** Endpoint admin — otomatis menyertakan token & refresh saat kedaluwarsa. */
export const adminApi = {
  login: (email, password) =>
    send('POST', '/api/auth/login', { body: { email, password } }).then((r) => r.data),

  logout: () => send('POST', '/api/auth/logout').catch(() => null),

  me: () => send('GET', '/api/auth/me', { auth: true }).then((r) => r.data),

  changePassword: (currentPassword, newPassword) =>
    send('POST', '/api/auth/change-password', {
      body: { currentPassword, newPassword },
      auth: true,
    }).then((r) => r.data),

  list: (resource, params) =>
    send('GET', `/api/${resource}${buildQuery(params)}`, { auth: true }).then((r) => ({
      items: Array.isArray(r.data) ? r.data : [],
      meta: r.meta ?? null,
    })),

  get: (resource, id) => send('GET', `/api/${resource}/${id}`, { auth: true }).then((r) => r.data),

  /** Untuk resource singleton (profile, site-settings) yang tanpa :id. */
  getOne: (resource) => send('GET', `/api/${resource}`, { auth: true }).then((r) => r.data),

  create: (resource, body) =>
    send('POST', `/api/${resource}`, { body, auth: true }).then((r) => r.data),

  update: (resource, id, body) =>
    send('PATCH', `/api/${resource}/${id}`, { body, auth: true }).then((r) => r.data),

  updateOne: (resource, body) =>
    send('PATCH', `/api/${resource}`, { body, auth: true }).then((r) => r.data),

  remove: (resource, id) => send('DELETE', `/api/${resource}/${id}`, { auth: true }),

  reorder: (resource, items) =>
    send('PATCH', `/api/${resource}/reorder`, { body: { items }, auth: true }).then((r) => r.data),

  upload: (file, { folder = 'misc', alt = '' } = {}) => {
    const form = new FormData();
    form.append('file', file);
    form.append('folder', folder);
    if (alt) form.append('alt', alt);
    return send('POST', '/api/media', { body: form, auth: true, isFormData: true }).then(
      (r) => r.data,
    );
  },
};
