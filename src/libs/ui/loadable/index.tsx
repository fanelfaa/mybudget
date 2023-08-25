import { Suspense } from 'react';
import { LoadingScreen } from '../loading-screen';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const loadable = (Component: any) => (props: JSX.IntrinsicAttributes) =>
	(
		<Suspense fallback={<LoadingScreen />}>
			<Component {...props} />
		</Suspense>
	);
