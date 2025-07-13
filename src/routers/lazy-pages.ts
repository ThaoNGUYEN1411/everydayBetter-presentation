import { lazy } from "react";

export const HomePage = lazy(() => import("../pages/HomePage"));
export const ActivityPage = lazy(() => import("../pages/ActivitiesPage"));
export const CreateUserPage = lazy(
  () => import("../components/user/CreateUser")
);
export const AuthenticateUserPage = lazy(
  () => import("../components/user/AuthenticateUser")
);

export const AdminPage = lazy(() => import("../components/admin/AdminPage"));
