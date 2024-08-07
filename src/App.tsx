import { ChakraProvider } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { useListenSupabaseSession } from "./libs/data-access/hooks/useListenSupabaseSession";
import { AppRoutes } from "./libs/features/app-routes";
import { theme } from "./libs/ui/theme";

export const queryClient = new QueryClient();

function App() {
   // need this to handle supabase authentication state
   useListenSupabaseSession();

   return (
      <QueryClientProvider client={queryClient}>
         <ChakraProvider theme={theme}>
            <AppRoutes />
         </ChakraProvider>
      </QueryClientProvider>
   );
}

export default App;
