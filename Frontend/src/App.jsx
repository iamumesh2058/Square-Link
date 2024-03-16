import React from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import {
	HomeLayout,
	Error,
	LandingPage,
	Register,
	Login,
	DashboardLayout,
	PlayGame,
	History,
	Profile,
	Stats,
	GameRoom
} from './pages';


const checkDefaultTheme = () => {
    const isDarkTheme = localStorage.getItem('darkTheme') === 'true';
    document.body.classList.toggle('dark-theme', isDarkTheme);
    return isDarkTheme;
};

const isDarkThemeEnabled = checkDefaultTheme();


const router = createBrowserRouter([
	{
		path: '/',
		element: <HomeLayout />,
		errorElement: <Error />,
		children: [
			{
				index: true,
				element: <LandingPage />
			},
			{
				path: 'register',
				element: <Register />
			},
			{
				path: 'login',
				element: <Login />
			},
			{
				path: 'dashboard',
				element: <DashboardLayout isDarkThemeEnabled={isDarkThemeEnabled} />,
				children: [
					{
						index: true,
						element: <PlayGame />,
					},
					{
						path: 'gameroom',
						element: <GameRoom />
					},
					{
						path: 'history',
						element: <History />
					},
					{
						path: 'stats',
						element: <Stats />
					},
					{
						path: 'profile',
						element: <Profile />
					}
				]
			}
		]
	}
])

const App = () => {
	return <RouterProvider router={router} />;
}

export default App;