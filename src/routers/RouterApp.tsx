import { Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import {
  ActivityPage,
  AdminPage,
  AuthenticateUserPage,
  CreateUserPage,
  ArticlesPage,
  ArticleDetailPage,
  PrivacyPolicy,
  AboutPage,
  ContactPage,
  NotFoundPage,
  FAQPage,
} from "./lazy-pages";
import Guard from "./Guard";
import RootLayout from "../layouts/RootLayout";
import AdminLayout from "../layouts/AdminLayout";
import HomePage from "../pages/HomePage";

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
