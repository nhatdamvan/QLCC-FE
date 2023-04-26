import React from "react";
import { Navigate } from "react-router-dom";
import { RoutePermittedRole } from "@crema/constants/AppEnums";

const Cskh = React.lazy(() => import("../../modules/cskh"));
const CreateCskh = React.lazy(() =>
  import("../../modules/cskh/CreateCustomerSupport")
);
const CustomerSupportDetail = React.lazy(() =>
  import("../../modules/cskh/CustomerSupportDetail")
);
const SMSTemplate = React.lazy(() => import("../../modules/SMSTemplate"));
const Maketing = React.lazy(() => import("../../modules/maketing"));
const CreateMarketingEmail = React.lazy(() =>
  import("../../modules/maketing/CreateWithEmail")
);
const CreateMarketingSms = React.lazy(() =>
  import("../../modules/maketing/CreateWithSms")
);
const CreateMarketingZalo = React.lazy(() =>
  import("../../modules/maketing/CreateWithZalo")
);
const Chat = React.lazy(() => import("../../modules/apps/Chat"));
const EmailTemplate = React.lazy(() => import("../../modules/SettingEmail"));
const CreateEmailTemplate = React.lazy(() =>
  import("../../modules/SettingEmail/CreateEmailTemplate")
);
const CreateSmsTemplate = React.lazy(() =>
  import("../../modules/SMSTemplate/CreateSMSTemplate")
);
const CreateZaloTemplate = React.lazy(() =>
  import("../../modules/ZaloTemplate/CreateZaloTemplate")
);
const ZaloTemplate = React.lazy(() => import("../../modules/ZaloTemplate"));
const Category = React.lazy(() => import("../../modules/categories"));

const CreateCategory = React.lazy(() =>
  import("../../modules/categories/addcategories")
);
const Setting = React.lazy(() => import("../../modules/setting"));
const Catalog = React.lazy(() => import("../../modules/catalog"));
const Roles = React.lazy(() => import("../../modules/roles"));
const CreateRoles = React.lazy(() => import("../../modules/roles/AddRoles"));
const Permissions = React.lazy(() => import("../../modules/permissions"));
const CreatePermissions = React.lazy(() =>
  import("../../modules/permissions/AddPermissions")
);
export const appsConfig = [
  {
    permittedRole: RoutePermittedRole.User,
    path: "/Permissions/List",
    element: <Permissions />,
  },
  {
    permittedRole: RoutePermittedRole.User,
    path: "/Permissions/:id",
    element: <CreatePermissions />,
  },
  {
    permittedRole: RoutePermittedRole.User,
    path: "/Category/:id",
    element: <CreateCategory />,
  },
  {
    permittedRole: RoutePermittedRole.User,
    path: "/Roles/List",
    element: <Roles />,
  },
  {
    permittedRole: RoutePermittedRole.User,
    path: "/Roles/:id",
    element: <CreateRoles />,
  },
  {
    permittedRole: RoutePermittedRole.User,
    path: "/cskh",
    element: <Cskh />,
  },
  {
    permittedRole: RoutePermittedRole.User,
    path: "/cskh/:id",
    element: <CreateCskh />,
  },
  {
    permittedRole: RoutePermittedRole.User,
    path: "/cskh/detail/:id",
    element: <CustomerSupportDetail />,
  },
  {
    permittedRole: RoutePermittedRole.User,
    path: "SmsTemplate/List",
    element: <SMSTemplate />,
  },
  {
    permittedRole: RoutePermittedRole.User,
    path: "/SmsTemplate/:id",
    element: <CreateSmsTemplate />,
  },
  {
    permittedRole: RoutePermittedRole.User,
    path: "/EmailTemplate/List",
    element: <EmailTemplate />,
  },
  {
    permittedRole: RoutePermittedRole.User,
    path: "/EmailTemplate/:id",
    element: <CreateEmailTemplate />,
  },
  {
    permittedRole: RoutePermittedRole.User,
    path: "ZaloTemplate/List",
    element: <ZaloTemplate />,
  },
  {
    permittedRole: RoutePermittedRole.User,
    path: "/ZaloTemplate/:id",
    element: <CreateZaloTemplate />,
  },
  {
    permittedRole: RoutePermittedRole.User,
    path: "/Category/List",
    element: <Category />,
  },
  {
    permittedRole: RoutePermittedRole.User,
    path: "/Setting",
    element: <Setting />,
  },
  {
    permittedRole: RoutePermittedRole.User,
    path: "/Catalog",
    element: <Catalog />,
  },
  {
    permittedRole: RoutePermittedRole.User,
    path: "/marketing",
    element: <Maketing />,
  },
  {
    permittedRole: RoutePermittedRole.User,
    path: "/marketing/email/:id",
    element: <CreateMarketingEmail />,
  },
  {
    permittedRole: RoutePermittedRole.User,
    path: "/marketing/sms/:id",
    element: <CreateMarketingSms />,
  },
  {
    permittedRole: RoutePermittedRole.User,
    path: "/marketing/zalo/:id",
    element: <CreateMarketingZalo />,
  },
  {
    permittedRole: RoutePermittedRole.User,
    path: "/apps/mail",
    element: <Navigate to="/apps/mail/inbox" />,
  },
  {
    permittedRole: RoutePermittedRole.User,
    path: "/apps/todo",
    element: <Navigate to="/apps/todo/all" />,
  },
  {
    permittedRole: RoutePermittedRole.User,
    path: "/apps/contact",
    element: <Navigate to="/apps/contact/folder/all" />,
  },
  {
    permittedRole: RoutePermittedRole.User,
    path: ["/apps/chat"],
    element: <Chat />,
  },
];
