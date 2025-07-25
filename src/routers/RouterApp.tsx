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
import ArticlesPage from "../pages/ArticlesPage";
import PrivacyPolicy from "../pages/PrivacyPolicy";
import AboutPage from "../pages/AboutPage";
import FAQPage from "../pages/FAQPage";
import ContactPage from "../pages/ContactPage";
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
            <Route path="users/">
              <Route path="create" element={<CreateUserPage />} />
              <Route path="authenticate" element={<AuthenticateUserPage />} />
            </Route>
            <Route path="/blog" element={<ArticlesPage />} />
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
/*Note:
- use file .tsx for import page or component type FC (not works with router.ts), in case not require Lazy loading : element: <HomePage/>
- Lazy loading:
	- A default export is defined using the default keyword. It is commonly used when a module exports only one main value (e.g., a single function, class, or component).
	- You can import a default export without curly braces ({}) and give it any name
	- Named export: in contrast named exports explicity define the exported values by their names. you can export multiple name values from a module. => You must use curly braces { } and match the exact names of the exported values
		 ex: export const Homepage
		 export const ContactPage (same module HomePage.tsx)
		 import {Homepage, ContactPage } from "./HomePage.tsx"
	=> export default => import default, export {} => import {}
	
	- When you dynamically import the module using await import(), it returns an object containing the default export as default ===>>> const { default: CreateHabitPage }
	- HomePage is the default export of the ../pages/HomePage file, you need to destructure it correctly.
	- When you import HomePage from "../pages/HomePage";, you are importing the default export of the module.
	- With dynamic imports (await import()), you access the default export via { default: HomePage }.
*/
