import React, { createContext, useContext, useState } from 'react';
import Wrapper from './DashboardLayout.style';
import { BigSidebar, Navbar, SmallSidebar } from '../../components';
import { Outlet, redirect, useLoaderData, useNavigate } from 'react-router-dom';
import { io } from "socket.io-client";
import customFetch from '../../utils/customFetch';
import { toast } from 'react-toastify';


// const socket = io.connect("http://localhost:8000");
const socket = io.connect("http://localhost:1000");

export const loader = async () => {
    try {
        const data = await customFetch.get('/user/current-user');
        return data;
    } catch (error) {
        return redirect('/');
    }
}

const DashboardContext = createContext();
const DashboardLayout = ({ isDarkThemeEnabled }) => {
    const navigate = useNavigate();
    const {data} = useLoaderData();
    const user = data.user;

    const [lobbyId, setLobbyId] = useState("");
    const [playerName, setPlayerName] = useState(user.username);
    const [playerId, setPlayerId] = useState("");
    const [playerColor, setPlayerColor] = useState("");
    const [rows, setRows] = useState(4);
    const [cols, setCols] = useState(4);
    const [gameMode, setGameMode] = useState("Vs Computer");
    const [gameLevel, setGameLevel] = useState("Hard");
    const [myLobby, setMyLobby] = useState(null);
    const [error, setError] = useState("");
    const [lines, setLines] = useState([]);
    const [squares, setSquares] = useState([]);


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

    socket.on("lobbyUpdated", (lobby) => {
        if (lobby) {
            setMyLobby(lobby);
            setLines(lobby.lines);
            setSquares(lobby.squares)
        }
    });

    socket.on("lobbyJoined", (playerId, playerColor) => {
        setPlayerId(playerId);
        setPlayerColor(playerColor);
    });


    socket.on("lobbyJoinedFail", ({ error }) => {
        setError(error);
    });

    socket.on("gameStarted", () => {
        setMyLobby({
            ...myLobby,
            gameStarted: true,
        })
        navigate("/dashboard/gameroom-multiplayer");
    });

    socket.on("gameEnded", () => {
        setMyLobby({
            ...myLobby,
            gameStarted: false,
        })
        navigate("/end");
    });

    return (
        <DashboardContext.Provider
            value={{
                socket,
                user,
                showSidebar,
                isDarkTheme,
                toggleDarkTheme,
                toggleSidebar,
                logoutUser,
                rows, setRows,
                cols, setCols,
                gameMode, setGameMode,
                gameLevel, setGameLevel,
                lobbyId, setLobbyId,
                playerName,
                playerId, setPlayerId,
                playerColor, setPlayerColor,
                myLobby, setMyLobby,
                error, setError,
                lines, setLines,
                squares, setSquares
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
                            <Outlet context={{ user }} />
                        </div>
                    </div>
                </main>
            </Wrapper>
        </DashboardContext.Provider>
    )
}

export const useDashboardContext = () => useContext(DashboardContext);
export default DashboardLayout;