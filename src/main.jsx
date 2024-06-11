import ReactDOM from "react-dom";
import React from "react";
import App from "./App";
import "./index.css";

import { RouterProvider, createBrowserRouter } from "react-router-dom";
import About from "./components/about/About";
import Experience from "./components/experience/Experience";
import Certificate from "./components/certificate/Certificate";
import Portfolio from "./components/portfolio/Portfolio";
import Contact from "./components/contact/Contact";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/about",
    element: <About />,
  },
  {
    path: "/experience",
    element: <Experience />,
  },
  {
    path: "/certificate",
    element: <Certificate />,
  },
  {
    path: "/portfolio",
    element: <Portfolio />,
  },
  {
    path: "/contact",
    element: <Contact />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
