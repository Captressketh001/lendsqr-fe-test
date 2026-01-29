import { Suspense } from "react";
import { type RouteObject } from "react-router-dom";
import Login from "@/pages/login";
import Layout from "@/pages/layout";
// import Dashboard from "@/pages/dashboard";
import Users from "@/pages/users";
import UserDetails from "@/pages/user-detail";
export const routes: Array<RouteObject> = [
  {
    index: true,
    element: (
      <Suspense>
        <Login />
      </Suspense>
    ),
  },
  {
    path: '/dashboard',
    children: [{
      path: "",
      element: (
        <Suspense>
          <Layout>
            <Users/>
          </Layout>
              
        </Suspense>
      ),
    }
    ],

  },
  {
    path: '/users',
    children: [{
      path: "",
      element: (
        <Suspense>
         
              <Layout> 
                <Users/>
              </Layout>
            
        </Suspense>
      ),
    }
    ],

  },
  {
    path: '/user/:id',
    children: [{
      path: "",
      element: (
        <Suspense>
         
              <Layout> 
                <UserDetails/>
              </Layout>
            
        </Suspense>
      ),
    }
    ],

  },
]

export default routes;