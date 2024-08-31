import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { financeStore } from "./store/financeStore.ts";
import "./main.css";
import MainPage from "./pages/MainPage.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AccountPage from "./pages/AccountPage.tsx";
import SpendingPage from "./pages/SpendingPage.tsx";
import TargetPage from "./pages/TargetPage.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainPage></MainPage>,
  },
  {
    path: "/account",
    element: <AccountPage></AccountPage>,
  },
  {
    path: "/spending",
    element: <SpendingPage></SpendingPage>,
  },
  {
    path: "/target",
    element: <TargetPage></TargetPage>,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={financeStore}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
