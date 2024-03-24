import React, { useEffect } from 'react';
import FormRowSelect from '../../components/FormRowSelect/FormRowSelect';
import Wrapper from './PlayGame.style';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDashboardContext } from '../DashboardLayout/DashboardLayout';
import { toast } from 'react-toastify';

const PlayGame = () => {
    const navigate = useNavigate();
    const {
        socket,
        lobbyId, setLobbyId,
        playerName,
        error, setError,
        rows, setRows,
        cols, setCols,
        gameLevel, setGameLevel,
        gameMode, setGameMode,
    } = useDashboardContext();

    useEffect(() => {
        localStorage.removeItem('gameBoard');
    }, []);

    const handlePlayButton = () => {
        const gameBoard = {
            rows: rows,
            cols: cols,
            gameLevel: gameLevel
        };
        localStorage.setItem('gameBoard', JSON.stringify(gameBoard));
        toast.success("Game started");
        navigate("/dashboard/gameroom");
    }


    const handleLobbyCreation = () => {
        socket.emit("createLobby", rows, cols);

        socket.on("lobbyCreated", (id) => {
            setLobbyId(id);
        });

        toast.success("Lobby Created Successfully");
        navigate('/dashboard/gamelobby/create');
    }

    const handleLobbyJoin = () => {
        if (lobbyId) {
            socket.emit("joinLobby", lobbyId, playerName);
            socket.on("lobbyJoinedFail", ({ error }) => {
                setError(error);
            });
            if(error !== ''){
                toast.error(error);
                navigate("/dashboard");
                return;
            }
        }
        toast.success("Lobby Joined");
        navigate('/dashboard/gamelobby/enter');
    }


    return (
        <Wrapper>
            {
                lobbyId &&
                <p>You're entering lobby: {lobbyId}</p>
            }
            {
                gameMode === 'Vs Friends' &&
                <div className="form-row">
                    <label htmlFor="lobby-id" className="form-label">
                        Lobby Code (To join lobby)
                    </label>
                    <input
                        type="text"
                        className="form-input"
                        value={lobbyId}
                        name="lobby-id"
                        onChange={(event) => {
                            setLobbyId(event.target.value);
                        }}
                    />
                </div>
            }


            <div className="form-row">
                <label htmlFor="player-name" className="form-label">
                    Player Name
                </label>
                <input
                    type="text"
                    defaultValue={playerName}
                    className="form-input"
                    disabled
                />
            </div>

            {
                !lobbyId &&
                <div className="matrix">
                    <FormRowSelect
                        labelText='Rows'
                        name="rows"
                        list={[4, 5, 6]}
                        defaultValue={rows.toString}
                        onChange={(e) => {
                            setRows(e.target.value);
                        }}
                    />

                    <FormRowSelect
                        labelText='Columns'
                        name="cols"
                        list={[4, 5, 6, 7, 8, 9, 10]}
                        defaultValue={cols.toString()}
                        onChange={(e) => {
                            setCols(e.target.value)
                        }}
                    />
                </div>
            }

            <FormRowSelect
                labelText="Game Mode"
                name='game-mode'
                list={["Vs Computer", "Vs Friends"]}
                defaultValue={gameMode}
                onChange={(e) => {
                    setGameMode(e.target.value);
                }}
            />

            {
                gameMode === 'Vs Computer' &&
                <FormRowSelect
                    labelText="Game Level"
                    name='game-level'
                    list={["Easy", "Medium", "Hard"]}
                    defaultValue={gameLevel}
                    onChange={(e) => {
                        setGameLevel(e.target.value);
                    }}
                />
            }

            {
                gameMode === "Vs Computer" &&
                <button className='btn btn-block form-btn' onClick={handlePlayButton}>
                    Play!
                </button>
                // <Link to="/dashboard/gameroom">
                //     <button className='btn btn-block form-btn'>
                //         Play!
                //     </button>
                // </Link>
            }

            {
                !lobbyId && gameMode === "Vs Friends" &&
                <button className='btn btn-block form-btn' onClick={handleLobbyCreation}>
                    Create Lobby!
                </button>
                // <Link to={`/dashboard/gamelobby/create`}>
                //     <button className='btn btn-block form-btn'>
                //         Create Lobby!
                //     </button>
                // </Link>
            }

            {
                lobbyId && gameMode === "Vs Friends" &&
                <button className='btn btn-block form-btn' onClick={handleLobbyJoin}>
                    Enter Lobby!
                </button>
                // <Link to={`/dashboard/gamelobby/enter`}>
                //     <button className='btn btn-block form-btn'>
                //         Enter Lobby!
                //     </button>
                // </Link>
            }
        </Wrapper>
    );
};

export default PlayGame;