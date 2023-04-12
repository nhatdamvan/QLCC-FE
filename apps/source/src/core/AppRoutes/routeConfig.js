import { RiShieldUserFill } from "react-icons/ri";
import { BsPersonLinesFill, BsFacebook } from "react-icons/bs";
import { AiOutlineBarChart, AiFillSetting, AiFillMail } from "react-icons/ai";
import { MdGroups } from "react-icons/md";
import { SiZalo } from "react-icons/si";
import { BiNetworkChart, BiCategoryAlt } from "react-icons/bi";
import { HiUserGroup, HiUsers } from "react-icons/hi";
import { FaSms } from "react-icons/fa";
import { GrCatalog } from "react-icons/gr";
import { ImUserTie } from "react-icons/im";
import { FaPhoneVolume, FaUserTie, FaUserShield } from "react-icons/fa";
import { BsChatDots } from "react-icons/bs";
import { RoutePermittedRole } from "@crema/constants/AppEnums";

const routesConfig = [
  {
    id: "apps",
    title: "Apps",
    messageId: "sidebar.apps.message",
    type: "group",
    children: [
      {
        id: "crm",
        title: "CRM",
        messageId: "sidebar.app.dashboard.crm",
        type: "item",
        permittedRole: [RoutePermittedRole.User, , RoutePermittedRole.Admin],
        icon: <AiOutlineBarChart />,
        url: "/dashboards/crm",
      },
      {
        id: "cskh",
        title: "CSKH",
        messageId: "sidebar.apps.cskh",
        type: "item",
        permittedRole: [RoutePermittedRole.User],
        icon: <FaPhoneVolume />,
        url: "/cskh",
      },
      {
        id: "chat",
        title: "Chat",
        messageId: "sidebar.apps.chat",
        type: "item",
        permittedRole: [RoutePermittedRole.User],
        icon: <BsChatDots />,
        url: "/apps/chat",
      },
      {
        id: "marketing",
        title: "Marketing",
        messageId: "sidebar.apps.maketing",
        type: "item",
        permittedRole: [RoutePermittedRole.User],
        icon: <BiNetworkChart />,
        url: "/marketing",
      },
    ],
  },
  {
    id: "app",
    title: "Application",
    messageId: "sidebar.application.manage",
    type: "group",
    children: [
      {
        id: "category-list",
        title: "Template",
        messageId: "sidebar.apps.Lead",
        type: "item",
        permittedRole: [RoutePermittedRole.User],
        icon: <BiCategoryAlt />,
        url: "/List",
      },
      {
        id: "customer",
        title: "User List",
        messageId: "sidebar.pages.userList.manage",
        type: "collapse",
        icon: <MdGroups />,
        children: [
          {
            id: "flat",
            title: "Flat",
            messageId: "sidebar.pages.userList.customerlist",
            type: "item",
            permittedRole: [RoutePermittedRole.User],
            icon: <ImUserTie />,
            url: "/Customer/List",
          },
          {
            id: "morden",
            title: "Modern",
            messageId: "sidebar.pages.userList.customergroup",
            type: "item",
            permittedRole: [RoutePermittedRole.User],
            icon: <HiUsers />,
            url: "/CustomerGroup/List",
          },
        ],
      },
      {
        id: "user",
        title: "User List",
        messageId: "sidebar.pages.userList.usermanager",
        type: "collapse",
        icon: <BsPersonLinesFill />,
        children: [
          {
            id: "flat",
            title: "Flat",
            messageId: "sidebar.pages.userList.manageUser",
            type: "item",
            permittedRole: [RoutePermittedRole.User],
            icon: <FaUserTie />,
            url: "/user-manager",
          },
          {
            id: "user-group",
            title: "Flat",
            messageId: "sidebar.pages.userList.group",
            type: "item",
            permittedRole: [RoutePermittedRole.User],
            icon: <HiUserGroup />,
            url: "/userGroup",
          },
          {
            id: "role-list",
            title: "Roles",
            messageId: "sidebar.apps.roles",
            type: "item",
            permittedRole: [RoutePermittedRole.User],
            icon: <FaUserShield />,
            url: "/Roles/List",
          },
          {
            id: "permission-list",
            title: "Permissions",
            messageId: "sidebar.apps.permissions",
            type: "item",
            permittedRole: [RoutePermittedRole.User],
            icon: <RiShieldUserFill />,
            url: "/Permissions/List",
          },
        ],
      },
    ],
  },
  {
    id: "social",
    title: "Apps",
    messageId: "sidebar.apps.setting",
    type: "group",
    children: [
      {
        id: "settingMail",
        title: "Template",
        messageId: "sidebar.apps.settingTemplateEmail",
        type: "item",
        permittedRole: [RoutePermittedRole.User],
        icon: <AiFillMail />,
        url: "/EmailTemplate/List",
      },
      {
        id: "settingSms",
        title: "Template",
        messageId: "sidebar.apps.settingTemplateSMS",
        type: "item",
        permittedRole: [RoutePermittedRole.User],
        icon: <FaSms />,
        url: "SmsTemplate/List",
      },
      {
        id: "settingZalo",
        title: "Template",
        messageId: "sidebar.apps.settingTemplateZalo",
        type: "item",
        permittedRole: [RoutePermittedRole.User],
        icon: <SiZalo />,
        url: "/ZaloTemplate/List",
      },
      {
        id: "settingFacebook",
        title: "Template",
        messageId: "sidebar.apps.settingTemplateFacebook",
        type: "item",
        permittedRole: [RoutePermittedRole.User],
        icon: <BsFacebook />,
        url: "/setting/Zalo-Template",
      },
    ],
  },
  {
    id: "group",
    title: "Apps",
    messageId: "sidebar.apps.CategoryManager",
    type: "group",
    children: [
      {
        id: "Catalog",
        title: "Template",
        messageId: "sidebar.apps.CatalogManager",
        type: "item",
        permittedRole: [RoutePermittedRole.User],
        icon: <GrCatalog />,
        url: "/Catalog",
      },
    ],
  },
  {
    id: "setting",
    title: "Apps",
    messageId: "sidebar.apps.settingSytemp",
    type: "group",
    children: [
      {
        id: "category-list",
        title: "Template",
        messageId: "sidebar.apps.category",
        type: "item",
        permittedRole: [RoutePermittedRole.User],
        icon: <BiCategoryAlt />,
        url: "Category/List",
      },
      {
        id: "setting",
        title: "Template",
        messageId: "sidebar.apps.settingS",
        type: "item",
        permittedRole: [RoutePermittedRole.User],
        icon: <AiFillSetting />,
        url: "/Setting",
      },
    ],
  },
];
export default routesConfig;
