"use client";

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Login from "./pages/login/login";
import Signup from "./pages/signup/signup";
import Main from "./pages/main";
import { ErrorBoundary } from "react-error-boundary";

import { Provider } from 'react-redux'
import store from './store'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
]);

function App() {
  return (
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </ErrorBoundary>
  );
};

export default App;
