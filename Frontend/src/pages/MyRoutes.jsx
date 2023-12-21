import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomeLayout from './HomeLayout/HomeLayout';
import LandingPage from './Landing/LandingPage';
import Error from './Error/Error';
import Register from './Authentication/Register';
import Login from './Authentication/Login';
import DashboardLayout from './DashboardLayout/DashboardLayout';
import PlayGame from './PlayGame/PlayGame';
import Stats from './Stats/Stats';
import Leaderboard from './Leaderboard/Leaderboard';
import Profile from './Profile/Profile';

const MyRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomeLayout />} errorElement={<Error />}>
                    <Route index element={<LandingPage />} />
                    <Route path='register' element={<Register />} />
                    <Route path='login' element={<Login />} />

                    <Route path='dashboard' element={<DashboardLayout />}>
                        <Route index element={<PlayGame />} />
                        <Route path='stats' element={<Stats />} />
                        <Route path='leaderboard' element={<Leaderboard />} />
                        <Route path='profile' element={<Profile />} />
                    </Route>

                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default MyRoutes;