import React, { useEffect, useState } from 'react';
import { useDashboardContext } from '../DashboardLayout/DashboardLayout';
import Wrapper from './GameRoomMultiplayer.style';
import { Link, useNavigate } from 'react-router-dom';
import { handleMouseUp } from '../../square_link_library/HandleMouseUpMultiplayer';
import customFetch from '../../utils/customFetch';
import { toast } from 'react-toastify';

const addHistory = async (data) => {
    await customFetch .post("/history/createHistory", data);
}

const GameRoomMultiplayer = () => {
    const navigate = useNavigate();
    const {
        user,
        myLobby, setMyLobby,
        lobbyId,
        socket,
        playerId, playerColor,
        playerName, setPlayerName,
        lines, setLines,
        squares, setSquares
    } = useDashboardContext();

    const [row, setRow] = useState(parseInt(myLobby.rows));
    const [col, setCol] = useState(parseInt(myLobby.cols));
    const [startIndex, setStartIndex] = useState(null);
    const [circles, setCircles] = useState([]);


    useEffect(() => {
        if (!lobbyId || myLobby === null) {
            navigate("/dashboard");
            return
        }
    }, [lobbyId]);


    useEffect(() => {
        toast.success("Game Started");
        localStorage.removeItem('Winner');
        let tempCircles = [];
        for (let i = 0; i < row; i++) {
            for (let j = 0; j < col; j++) {
                tempCircles.push({ cx: j * 75 + 25, cy: i * 75 + 25 });
            }
        }
        setCircles(tempCircles);

        if (!playerName) {
            setPlayerName(myLobby.players.find(obj => obj.playerId === playerId).playerName);
        }
    }, [row, col]);


    useEffect(() => {
        if (lines.length === ((row * (col - 1)) + (col * (row - 1)))) {
            const data = {
                gameStatus: "",
                myScore: 0,
                opponentScore: 0,
                opponent: "",
            }
            const playerNameToScore = {};
            myLobby.players.forEach((player) => {
                playerNameToScore[player.playerName] = player.playerScore;
            });

            let winner = '';
            let highestScore = -Infinity;

            for (const [player, score] of Object.entries(playerNameToScore)) {
                if (score > highestScore) {
                    winner = player;
                    highestScore = score;
                }
            }

            localStorage.setItem("Winner", winner);

            data["myScore"] = playerNameToScore[user.username];

            delete playerNameToScore[user.username];

            data["opponentScore"] = Object.values(playerNameToScore).reduce((acc, cur) => {
                return acc + cur;
            }, 0);

            const opponentPlayers = Object.entries(playerNameToScore).map(([key, value]) => `${key}(${value})`).join(", ");
            data["opponent"] = opponentPlayers;

            const scores = Object.values(playerNameToScore);
            scores.sort((a, b) => a - b);

            scores.map((score) => {
                if (data.myScore > score) {
                    data.gameStatus = "Win";
                }
                else if (data.myScore === score) {
                    data.gameStatus = "Draw";
                }
                else {
                    data.gameStatus = "Lose";
                }
            });
            addHistory(data);
            navigate("/dashboard/end");
        }
    }, [lines]);


    return (
        <Wrapper>
            <div className="main-content-gameroom">
                <div className="gamestats">
                    {myLobby &&
                        <div className="players-list">
                            <h4>Players:</h4>
                            <ol type='a' className="players-list">
                                {myLobby.players.map((player) => {
                                    if (playerId === player.playerId) {
                                        return (
                                            <li
                                                key={player.playerId}
                                                style={{ color: player.playerColor }}
                                            >
                                                <div
                                                    className="this-player"
                                                >
                                                    {player.playerName}:{player.playerScore}
                                                </div>
                                            </li>
                                        )
                                    }
                                    return (
                                        <li
                                            key={player.playerId}
                                            style={{ color: player.playerColor }}
                                        >
                                            {player.playerName}:{player.playerScore}
                                        </li>
                                    )
                                })}
                            </ol>
                        </div>
                    }

                    <div className="invite-link">
                        <Link to="/dashboard/end">
                            <button className="end btn form-btn" >
                                End!
                            </button>
                        </Link>
                    </div>
                </div>

                <div className="gameboard">
                    <h5>
                        Player Turn: {
                            myLobby.players.find(
                                (obj) => obj.playerId === myLobby.playerTurn[0]).playerName
                        }
                    </h5>
                    <svg width="800" height="400">
                        {circles.map((circle, index) => (
                            <circle
                                cx={circle.cx}
                                cy={circle.cy}
                                r={15}
                                fill='var(--primary-500)'
                                stroke="var(--text-color)"
                                onMouseDown={() => setStartIndex(index)}
                                onMouseUp={(e) => handleMouseUp(index, row, col, lines, setLines, startIndex, setStartIndex, squares, setSquares, myLobby, setMyLobby, lobbyId, socket, playerId, playerColor, playerName)}
                                key={index}
                            />
                        ))}
                        {lines.map((line, index) => (
                            <line
                                x1={circles[line.start].cx}
                                y1={circles[line.start].cy}
                                x2={circles[line.end].cx}
                                y2={circles[line.end].cy}
                                stroke={line.color}
                                key={index}
                            />
                        ))}
                        {squares.map((square, index) => (
                            <text
                                key={index}
                                x={circles[square.start].cx + 36}
                                y={circles[square.start].cy + 36}
                                fontSize="20"
                                fill={square.color}
                                textAnchor="middle"
                                dominantBaseline="central"
                            >
                                {square.playerInitials}
                            </text>

                        ))}
                    </svg>
                </div>
            </div>
        </Wrapper>
    )
}

export default GameRoomMultiplayer;