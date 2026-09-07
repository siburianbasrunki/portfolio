import React, { Suspense, lazy } from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./index.css";

import App from "./App";
import PublicLayout from "./layouts/PublicLayout";
import About from "./components/about/About";
import Experience from "./components/experience/Experience";
import Certificate from "./components/certificate/Certificate";
import Portfolio from "./components/portfolio/Portfolio";
import Contact from "./components/contact/Contact";
import { LoadingState } from "./components/common/PageState";

// CMS dimuat hanya saat /admin dibuka — pengunjung website tidak perlu
// ikut mengunduh kode admin yang tidak akan mereka pakai.
const AdminApp = lazy(() => import("./admin/AdminApp"));

const router = createBrowserRouter([
  {
    element: <PublicLayout />,
    children: [
      { path: "/", element: <App /> },
      { path: "/about", element: <About /> },
      { path: "/experience", element: <Experience /> },
      { path: "/certificate", element: <Certificate /> },
      { path: "/portfolio", element: <Portfolio /> },
      { path: "/contact", element: <Contact /> },
    ],
  },
  // Admin punya cabang sendiri: tidak memuat bootstrap publik dan tidak
  // memakai layout/footer website.
  {
    path: "/admin/*",
    element: (
      <Suspense fallback={<LoadingState label="Memuat CMS..." />}>
        <AdminApp />
      </Suspense>
    ),
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
