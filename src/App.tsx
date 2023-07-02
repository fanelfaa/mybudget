import { ChakraProvider } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { AppRoutes } from './libs/features/app-routes';
import { useListenSupabaseSession } from './libs/data-access/hooks/useListenSupabaseSession';

export const queryClient = new QueryClient();

function App() {
	// need this to handle supabase authentication state
	useListenSupabaseSession();

	return (
		<QueryClientProvider client={queryClient}>
			<ChakraProvider>
				<AppRoutes />
			</ChakraProvider>
		</QueryClientProvider>
	);
}

export default App;
