import { Suspense } from "react";
import { type RouteObject } from "react-router-dom";
import Login from "@/pages/login";
import Layout from "@/pages/layout";
import Dashboard from "@/pages/dashboard";
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
            <Dashboard/>
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
                
              </Layout>
            
        </Suspense>
      ),
    }
    ],

  },
]

export default routes;