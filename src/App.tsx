import { Fragment } from "react";
import { Outlet, ScrollRestoration } from "react-router-dom";
import { Toaster  } from "react-hot-toast";
import { useEffect } from "react";
import { initDB } from "@/utils/indexedDB";
export default function App() {
  useEffect(() => {
    initDB()
      .then(() => console.log('IndexedDB initialized'))
      .catch(err => console.error('IndexedDB initialization failed:', err));
  }, []);
  return (
    <Fragment>
        <Outlet />
        <ScrollRestoration />
        <Toaster/>
    </Fragment>
  );
}
