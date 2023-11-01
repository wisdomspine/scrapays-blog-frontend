import { BooksPage } from "app/routes/books/books-page";
import { LoginPage } from "app/routes/login/login-page";
import {
  RouteObject,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";

const routes: RouteObject[] = [
  {
    path: "",
    Component: BooksPage,
    children: [
      {
        path: "new",
      },
      {
        path: ":id/edit",
      },
    ],
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
