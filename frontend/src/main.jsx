import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import ErrorPage from "./shared/errorPage/ErrorPage.jsx";
import SingleListPage from "./SingleListPage/SingleListPage";
import App from "./App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ListsContextProvider from "./ListsContextProvider";
import TasksContextProvider from "./TasksContextProvider";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/list/:listId",
    element: <SingleListPage />,
    errorElement: <ErrorPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ListsContextProvider>
      <TasksContextProvider>
        <RouterProvider router={router} />
      </TasksContextProvider>
    </ListsContextProvider>
  </React.StrictMode>
);
