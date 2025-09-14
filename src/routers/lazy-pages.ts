import { lazy } from "react";

export const ArticlesPage = lazy(() => import("../pages/ArticlesPage"));
export const ArticleDetailPage = lazy(
  () => import("../pages/ArticleDetailPage")
);
export const AboutPage = lazy(() => import("../pages/AboutPage"));
export const FAQPage = lazy(() => import("../pages/FAQPage"));
export const ContactPage = lazy(() => import("../pages/ContactPage"));
export const NotFoundPage = lazy(() => import("../pages/NotFoundPage"));
export const PrivacyPolicy = lazy(() => import("../pages/PrivacyPolicy"));
export const ActivityPage = lazy(() => import("../pages/ActivitiesPage"));
export const CreateUserPage = lazy(
  () => import("../components/user/CreateUser")
);
export const AuthenticateUserPage = lazy(
  () => import("../components/user/AuthenticateUser")
);

export const AdminPage = lazy(() => import("../components/admin/AdminPage"));
