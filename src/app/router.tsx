import { BooksPage } from "app/routes/books/books-page";
import { EditBookPage } from "app/routes/edit-book/edit-book-page";
import { LoginPage } from "app/routes/login/login-page";
import { NewBookPage } from "app/routes/new-book/new-book-page";
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
        Component: NewBookPage,
      },
      {
        path: ":id/edit",
        Component: EditBookPage,
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
