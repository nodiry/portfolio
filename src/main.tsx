import "./index.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AboutPage from "./app/about/page";
import UnAvailable from "./errors/404";
import { ThemeProvider } from "./components/theme-provider";
import LandingPage from "./app/landing/page";
import YozPage from "./app/yoz/page";
import BlogsPage from "./app/blog/page";
import BlogPage from "./app/blog/blog";
import ContactPage from "./app/contact/page";
import ProjectsPage from "./app/project/page";
import ProjectPage from "./app/project/Project";
import NavBar from "./components/NavBar";
import { Toaster } from "./components/ui/sonner";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/blog" element={<BlogsPage />} />
          <Route path="/blog/:slug" element={<BlogPage />} />
          <Route path="/project" element={<ProjectsPage />} />
          <Route path="/project/:slug" element={<ProjectPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/yoz" element={<YozPage />} />
          <Route path="*" element={<UnAvailable />} />
        </Routes>
      </Router>
      <Toaster />
    </ThemeProvider>
  </StrictMode>
);
