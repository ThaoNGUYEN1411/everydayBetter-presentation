import { Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import {
  ActivityPage,
  AdminPage,
  AuthenticateUserPage,
  CreateUserPage,
  HomePage,
} from "./lazy-pages";
import Guard from "./Guard";
import RootLayout from "../layouts/RootLayout";
import NotFoundPage from "../pages/NotFoundPage";
import AdminLayout from "../layouts/AdminLayout";
import PrivacyPolicy from "../pages/PrivacyPolicy";
import AboutPage from "../pages/AboutPage";
import FAQPage from "../pages/FAQPage";
import ContactPage from "../pages/ContactPage";
import ArticlesPage from "../pages/ArticlesPage";
import ArticleDetailPage from "../pages/ArticleDetailPage";
//todo: add page in lazy loading et test
const RouterApp = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Chargement...</div>}>
        <Routes>
          <Route path="/" element={<RootLayout />}>
            <Route index element={<HomePage />} />
            <Route path="privacy-policy" element={<PrivacyPolicy />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="faq" element={<FAQPage />} />
            <Route path="contact" element={<ContactPage />} />
            <Route path="/advices" element={<ArticlesPage />} />
            <Route path="/advices/:id" element={<ArticleDetailPage />} />
            <Route path="users/">
              <Route path="create" element={<CreateUserPage />} />
              <Route path="authenticate" element={<AuthenticateUserPage />} />
            </Route>
            {/* todo: add la<y loading blog or articles? */}
            <Route
              path="activities"
              element={
                <Guard allowedRoles={["ROLE_USER"]}>
                  <ActivityPage />
                </Guard>
              }
            ></Route>

            <Route path="*" element={<NotFoundPage />} />
          </Route>
          <Route
            path="/admin"
            element={
              <Guard allowedRoles={["ROLE_ADMIN"]}>
                <AdminLayout />
              </Guard>
            }
          >
            <Route index element={<AdminPage />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default RouterApp;
