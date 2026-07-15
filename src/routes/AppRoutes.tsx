import { Navigate, Route, Routes } from "react-router-dom";
import { SiteLayout } from "../common/components/site-layout/SiteLayout";
import { AboutPage } from "../pages/about/AboutPage";
import { ContactPage } from "../pages/contact/ContactPage";
import { CatalogPage } from "../pages/courses/CatalogPage";
import { CoursesPage } from "../pages/courses/CoursesPage";
import { HomePage } from "../pages/home/HomePage";
import { NotFoundPage } from "../pages/not-found/NotFoundPage";
import { ResourcePage } from "../pages/resources/ResourcePage";

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<SiteLayout />}>
        <Route index element={<HomePage />} />
        <Route path="courses" element={<CoursesPage />} />
        <Route path="courses/annual" element={<CatalogPage type="annual" />} />
        <Route
          path="courses/thematic"
          element={<CatalogPage type="thematic" />}
        />
        <Route path="books" element={<ResourcePage kind="books" />} />
        <Route path="materials" element={<ResourcePage kind="materials" />} />
        <Route path="learn-free" element={<ResourcePage kind="free" />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="contact" element={<ContactPage />} />

        <Route path="cursos" element={<Navigate replace to="/courses" />} />
        <Route
          path="cursos/anuales"
          element={<Navigate replace to="/courses/annual" />}
        />
        <Route
          path="cursos/tematicos"
          element={<Navigate replace to="/courses/thematic" />}
        />
        <Route path="libros" element={<Navigate replace to="/books" />} />
        <Route
          path="materiales"
          element={<Navigate replace to="/materials" />}
        />
        <Route
          path="aprende-gratis"
          element={<Navigate replace to="/learn-free" />}
        />
        <Route path="nosotros" element={<Navigate replace to="/about" />} />
        <Route path="contacto" element={<Navigate replace to="/contact" />} />

        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
