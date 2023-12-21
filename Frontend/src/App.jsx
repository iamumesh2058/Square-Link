import React from 'react';
import MyRoutes from './pages/MyRoutes';
import { DashboardProvider } from './context/DashboardContext';
import { UserProvider } from './context/UserContext';

const App = () => {


	return (
		<>
			<UserProvider>
				<DashboardProvider>
					<MyRoutes />
				</DashboardProvider>
			</UserProvider>
		</>
	);
}

export default App;