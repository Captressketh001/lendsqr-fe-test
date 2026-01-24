import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import routes from "@/app-routes/index";
import App from "@/App";
import Error from "@/pages/error";
import "@/index.module.scss";

const container = document.getElementById("root") as HTMLElement;

const root = createRoot(container);

const router = createBrowserRouter([
  { 
    path: "/",
    element: <App />,
    children: routes,
    errorElement: <Error/>,
  },
]);

root.render(
  <RouterProvider router={router} />
);
