import { getRooms } from "@/libs/data-access/api/room";
import { BaseLayout } from "@/libs/ui/layout";
import { loadable } from "@/libs/ui/loadable";
import { lazy } from "react";
import { Navigate, RouteObject } from "react-router-dom";

const LoginPage = loadable(lazy(() => import("../pages/login/Login")));
const RoomPage = loadable(lazy(() => import("../pages/room/Room")));
const BudgetListPage = loadable(lazy(() => import("../pages/budget/List")));
const BudgetDetailPage = loadable(lazy(() => import("../pages/budget/Detail")));

export const publicRoutes: RouteObject[] = [
   {
      path: "/login",
      element: <LoginPage />,
   },
];

export const privateRoutes: RouteObject[] = [
   {
      path: "/",
      element: <Navigate to="/room" />,
   },
   {
      element: <BaseLayout />,
      children: [
         {
            path: "/room",
            element: <RoomPage />,
            loader: () => getRooms(),
         },
         {
            path: "/room/:roomId/budget",
            element: <BudgetListPage />,
         },
         {
            path: "/room/:roomId/budget/:budgetId",
            element: <BudgetDetailPage />,
         },
      ],
   },
];
