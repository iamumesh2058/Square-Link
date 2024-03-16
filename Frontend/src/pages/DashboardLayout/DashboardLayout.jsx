import React, { createContext, useContext, useState } from 'react';
import Wrapper from './DashboardLayout.style';
import { BigSidebar, Navbar, SmallSidebar } from '../../components';
import { Outlet, useNavigate } from 'react-router-dom';

const DashboardContext = createContext();


const DashboardLayout = ({ isDarkThemeEnabled }) => {
    // GAME CONSTANTS
    const [rows, setRows] = useState(4);
    const [cols, setCols] = useState(4);
    const [gameMode, setGameMode] = useState("Vs Computer");
    const [gameLevel, setGameLevel] = useState("Hard");
    const [lines, setLines] = useState([]);
    const [squares, setSquares] = useState([]);

    const user = {
        'name': "Umesh"
    };
    const navigate = useNavigate();
    const [showSidebar, setShowSidebar] = useState(false);
    const [isDarkTheme, setIsDarkTheme] = useState(isDarkThemeEnabled);

    const toggleDarkTheme = () => {
        const newDarkTheme = !isDarkTheme;
        setIsDarkTheme(newDarkTheme);
        document.body.classList.toggle('dark-theme', newDarkTheme);
        localStorage.setItem('darkTheme', newDarkTheme);
    }

    const toggleSidebar = () => {
        setShowSidebar(!showSidebar);
    }

    const logoutUser = async () => {
        navigate('/');
        const { data } = await customFetch.get('/auth/logout');
        toast.success(data?.msg);
    }
    return (
        <DashboardContext.Provider
            value={{
                user,
                showSidebar,
                isDarkTheme,
                toggleDarkTheme,
                toggleSidebar,
                logoutUser,
                rows,
                setRows,
                cols,
                setCols,
                gameMode,
                setGameMode,
                gameLevel,
                setGameLevel
            }}
        >
            <Wrapper>
                <main className="dashboard">
                    {
                        showSidebar ?
                            <SmallSidebar />
                            :
                            <></>

                    }
                    <BigSidebar />
                    <div>
                        <Navbar />
                        <div className="dashboard-page">
                            <Outlet />
                        </div>
                    </div>
                </main>
            </Wrapper>
        </DashboardContext.Provider>
    )
}

export const useDashboardContext = () => useContext(DashboardContext);
export default DashboardLayout;