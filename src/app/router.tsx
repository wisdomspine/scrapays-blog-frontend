import { LoginPage } from "app/routes/login/login-page";
import {
  RouteObject,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";

const routes: RouteObject[] = [
  {
    path: "",
  },
  {
    path: "login",
    Component: LoginPage,
  },
];
const router = createBrowserRouter(routes);

export function AppRouter() {
  return <RouterProvider router={router} />;
}
