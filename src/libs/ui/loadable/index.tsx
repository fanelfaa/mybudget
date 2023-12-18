import { Suspense } from "react";
import { LoadingScreen } from "../loading-screen";

export const loadable = (Component: any) => (props: JSX.IntrinsicAttributes) =>
   (
      <Suspense fallback={<LoadingScreen />}>
         <Component {...props} />
      </Suspense>
   );
