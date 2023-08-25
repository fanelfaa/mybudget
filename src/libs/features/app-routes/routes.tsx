import { Navigate, RouteObject } from 'react-router-dom';
import { lazy } from 'react';
import { BaseLayout } from '@/libs/ui/layout';
// import LoginPage from '../pages/login/Login';
// import RoomPage from '../pages/room/Room';
// import BudgetListPage from '../pages/budget/List';
// import BudgetDetailPage from '../pages/budget/Detail';
import { getRooms } from '@/libs/data-access/api/room';
import { loadable } from '@/libs/ui/loadable';

const LoginPage = loadable(lazy(() => import('../pages/login/Login')));
const RoomPage = loadable(lazy(() => import('../pages/room/Room')));
const BudgetListPage = loadable(lazy(() => import('../pages/budget/List')));
const BudgetDetailPage = loadable(lazy(() => import('../pages/budget/Detail')));

export const publicRoutes: RouteObject[] = [
	{
		path: '/login',
		element: <LoginPage />,
	},
];

export const privateRoutes: RouteObject[] = [
	{
		path: '/',
		element: <Navigate to="/room" />,
	},
	{
		element: <BaseLayout />,
		children: [
			{
				path: '/room',
				element: <RoomPage />,
				loader: () => getRooms(),
			},
			{
				path: '/room/:roomId/budget',
				element: <BudgetListPage />,
			},
			{
				path: '/room/:roomId/budget/:budgetId',
				element: <BudgetDetailPage />,
			},
		],
	},
];
