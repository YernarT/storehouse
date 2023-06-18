import { I_Route } from "@/def_types/route";

import { lazy } from "react";
import { CommonSkeleton } from "@/components/skeleton";

const routes: I_Route[] = [
  {
    path: "/",
    component: lazy(() => import("@/pages/StartPage")),
    fallback: <CommonSkeleton />,
    auth: false,
    exact: true,
  },

  {
    path: "/main",
    component: lazy(() => import("@/pages/MainPage")),
    fallback: <CommonSkeleton />,
    auth: true,
    exact: true,
  },

  {
    path: "/tag",
    component: lazy(() => import("@/pages/TagPage")),
    fallback: <CommonSkeleton />,
    auth: true,
    exact: true,
  },

  {
    path: "/profile",
    component: lazy(() => import("@/pages/ProfilePage")),
    fallback: <CommonSkeleton />,
    auth: true,
    exact: true,
  },

  {
    path: "*",
    component: lazy(() => import("@/pages/PageNotFound")),
    fallback: <CommonSkeleton />,
    auth: false,
    exact: false,
  },
];

export default routes;
