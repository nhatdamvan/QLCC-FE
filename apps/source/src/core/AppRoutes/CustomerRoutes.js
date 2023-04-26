import React from "react";
import { RoutePermittedRole } from "@crema/constants/AppEnums";

const Customer = React.lazy(() => import("../../modules/customerList"));
const CustomerDetail = React.lazy(() =>
  import("../../modules/customerList/CustomerDetail")
);
const CustomerGroup = React.lazy(() => import("../../modules/customerGroup"));
const CreateCustomerGroup = React.lazy(() =>
  import("../../modules/customerGroup/AddcustomerGroup")
);
export const customerConfig = [
  {
    permittedRole: RoutePermittedRole.User,
    path: "/Customer/List",
    element: <Customer />,
  },
  {
    permittedRole: RoutePermittedRole.User,
    path: "/Customer/:id",
    element: <CustomerDetail />,
  },
  {
    permittedRole: RoutePermittedRole.User,
    path: "/CustomerGroup/List",
    element: <CustomerGroup />,
  },
  {
    permittedRole: RoutePermittedRole.User,
    path: "/CustomerGroup/:id",
    element: <CreateCustomerGroup />,
  },
];
