import React from "react";

const Signin = React.lazy(() => import("../../modules/auth/Signin"));
const Signup = React.lazy(() => import("../../modules/auth/Signup"));

const ConfirmSignupAwsCognito = React.lazy(() =>
  import("../../modules/auth/Signup/ConfirmSignupAwsCognito")
);
export const authRouteConfig = [
  {
    path: "/signin",
    element: <Signin />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/confirm-signup",
    element: <ConfirmSignupAwsCognito />,
  },
];
