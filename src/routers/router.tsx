import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../layouts/RootLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "",
        lazy: async () => {
          const { default: HomePage } = await import("../pages/HomePage");
          return { Component: HomePage };
        },
      },
      {
        path: "activities",
        lazy: async () => {
          const { default: ActivitiesPage } = await import(
            "../pages/ActivitiesPage"
          );
          return { Component: ActivitiesPage };
        },
      },
      {
        path: "users/create",
        lazy: async () => {
          const { default: CreateUserPage } = await import(
            "../components/user/CreateUser"
          );
          return { Component: CreateUserPage };
        },
      },
      {
        path: "users/authenticate",
        lazy: async () => {
          const { default: UserAuthenticatePage } = await import(
            "../components/user/AuthenticateUser"
          );
          return { Component: UserAuthenticatePage };
        },
      },
    ],
  },
]);

export default router;

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
