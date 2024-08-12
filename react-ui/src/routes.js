import React from "react";

import { Icon } from "@chakra-ui/react";
import {
  MdBarChart,
  MdPerson,
  MdHome,
//MdLock,
  MdLogout,
  //MdOutlineShoppingCart,
} from "react-icons/md";

// Admin Imports
import MainDashboard from "views/admin/default";
import NFTMarketplace from "views/admin/marketplace";
//import Profile from "views/admin/profile";
import DataTables from "views/admin/dataTables";
//import RTL from "views/admin/rtl";

// Auth Imports
// import SignInCentered from "views/auth/signIn";
import SignIn from "views/auth/signIn/index.jsx";
import Trafic from "views/admin/dataTables/traffic.js";


const routes = [
  {
    name: "CH-Dashboard",
    layout: "/admin",
    path: "/default",
    icon: <Icon as={MdHome} width='20px' height='20px' color='inherit' />,
    component: MainDashboard,
  },
  {
    name: "Profile",
    layout: "/admin",
    path: "/nft-marketplace",
    
    icon: <Icon as={MdPerson} width='20px' height='20px' color='inherit' />
     
    ,
    component: NFTMarketplace,
    secondary: true,
  },
  {
    name: "Identité",
    layout: "/admin",
    icon: <Icon as={MdBarChart} width='20px' height='20px' color='inherit' />,
    path: "/data-tables",
    component: DataTables,
  },
  { /*{
    name: "Essaie",
    layout: "/admin",
    path: "/profile",
    icon: <Icon as={MdPerson} width='20px' height='20px' color='inherit' />,
    component: Profile,
  },*/},

  { 
    name: "Trafic",
    layout: "/admin",
    path: "/traffic",
    icon: (
      <Icon as={MdBarChart} width='20px' height='20px' color='inherit' />
    ),
    component: Trafic,
    hide: true
  },
  {
    name: "Signin",
    layout: "/auth",
    path: "/sign-in",
    icon: (
      <Icon as={MdHome} width='16px' height='16px' color='inherit' />
    ),
    component: SignIn,
    hide: true
  },
 
 { /*{
    name: "RTL Admin",
    layout: "/rtl",
    path: "/rtl-default",
    icon: <Icon as={MdHome} width='20px' height='20px' color='inherit' />,
    component: RTL,
  },*/}
];

export const Logout = [
  {
    name: "Log Out",
    layout: "/auth",
    path: "/sign-out",
    icon: (
      <Icon as={MdLogout} width='16px' height='16px' color='inherit' />
    ),
    component: SignIn,
  }
];
export default routes;
