import React from "react";
import { RoutePermittedRole } from "@crema/constants/AppEnums";

const User = React.lazy(() => import("../../modules/userList"));
const CreateUser = React.lazy(() =>
  import("../../modules/userList/CreateUser")
);
const UserGroup = React.lazy(() => import("../../modules/userGroup"));
const UserGroupCreate = React.lazy(() =>
  import("../../modules/userGroup/createUserGroup")
);
export const userListConfig = [
  {
    permittedRole: RoutePermittedRole.User,
    path: "/user-manager",
    element: <User />,
  },
  {
    permittedRole: RoutePermittedRole.User,
    path: "/User/:id",
    element: <CreateUser />,
  },
  {
    permittedRole: RoutePermittedRole.User,
    path: "/userGroup",
    element: <UserGroup />,
  },
  {
    permittedRole: RoutePermittedRole.User,
    path: "/userGroup/:id",
    element: <UserGroupCreate />,
  },
];
