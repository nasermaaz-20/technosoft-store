import { StrictMode, Suspense, lazy } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import ScrollToTop from "./ScrollToTop.jsx";

const App = lazy(() => import("./App.jsx"));
const About = lazy(() => import("./pages/About.jsx"));
const Services = lazy(() => import("./pages/Services.jsx"));
const Products = lazy(() => import("./pages/Products.jsx"));
const Contact = lazy(() => import("./pages/Contact.jsx"));
const AdminLogin = lazy(() => import("./pages/admin/Login.jsx"));
const AdminDashboard = lazy(() => import("./pages/admin/Dashboard.jsx"));
const ManageProducts = lazy(() => import("./pages/admin/ManageProducts.jsx"));
const ManageServices = lazy(() => import("./pages/admin/ManageServices.jsx"));

function LoadingScreen() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-neutral-950 text-amber-300">
      <div className="h-10 w-10 animate-spin rounded-full border-2 border-amber-500 border-t-transparent" />
    </div>
  );
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <ScrollToTop />
      <Suspense fallback={<LoadingScreen />}>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/products" element={<Products />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/products" element={<ManageProducts />} />
          <Route path="/admin/services" element={<ManageServices />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  </StrictMode>
);
