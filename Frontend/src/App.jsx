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
	GameRoom,
	GameRoomMultiplayer,
	GameLobby,
	EndRoom
} from './pages';

import { action as registerAction } from './pages/Authentication/Register';
import { action as loginAction } from './pages/Authentication/Login';
import { loader as dashboardLoader } from './pages/DashboardLayout/DashboardLayout';
import { action as profileAction } from './pages/Profile/Profile';
import { loader as historyLoader } from './pages/History/History';
import { loader as statsLoader } from './pages/Stats/Stats';
// import { loader as endroomLoader } from './pages/EndRoom/EndRoom';


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
				element: <Register />,
				action: registerAction
			},
			{
				path: 'login',
				element: <Login />,
				action: loginAction
			},
			{
				path: 'dashboard',
				element: <DashboardLayout isDarkThemeEnabled={isDarkThemeEnabled} />,
				loader: dashboardLoader,
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
						path: 'gamelobby/:any',
						element: <GameLobby />
					},
					{
						path: 'gameroom-multiplayer',
						element: <GameRoomMultiplayer />
					},
					{
						path: 'end',
						element: <EndRoom />,
						// loader: endroomLoader
					},
					{
						path: 'history',
						element: <History />,
						loader: historyLoader
					},
					{
						path: 'stats',
						element: <Stats />,
						loader: statsLoader
					},
					{
						path: 'profile',
						element: <Profile />,
						action: profileAction
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