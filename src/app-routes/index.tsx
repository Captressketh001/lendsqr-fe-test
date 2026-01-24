import { Suspense } from "react";
import { type RouteObject } from "react-router-dom";
import Login from "@/pages/login";
export const routes: Array<RouteObject> = [
  {
    index: true,
    element: (
      <Suspense>
        <Login />
      </Suspense>
    ),
  }
]

export default routes;