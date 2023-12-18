import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { RequiredAuth } from "./RequiredAuth";
import { privateRoutes, publicRoutes } from "./routes";

const appRoutes = createBrowserRouter([
   ...publicRoutes,
   {
      element: <RequiredAuth />,
      children: [...privateRoutes],
   },
]);

export const AppRoutes = () => <RouterProvider router={appRoutes} />;
