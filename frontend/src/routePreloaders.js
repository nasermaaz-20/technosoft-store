export const routePreloaders = {
  "/": () => import("./App.jsx"),
  "/about": () => import("./pages/About.jsx"),
  "/services": () => import("./pages/Services.jsx"),
  "/products": () => import("./pages/Products.jsx"),
  "/contact": () => import("./pages/Contact.jsx"),
  "/admin/login": () => import("./pages/admin/Login.jsx"),
  "/admin": () => import("./pages/admin/Dashboard.jsx"),
  "/admin/products": () => import("./pages/admin/ManageProducts.jsx"),
  "/admin/services": () => import("./pages/admin/ManageServices.jsx"),
};

