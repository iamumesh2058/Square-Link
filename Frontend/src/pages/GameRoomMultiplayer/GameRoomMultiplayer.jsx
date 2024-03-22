import React, { useEffect, useState } from 'react';
import { useDashboardContext } from '../DashboardLayout/DashboardLayout';
import Wrapper from './GameRoomMultiplayer.style';
import { Link } from 'react-router-dom';
import { handleMouseUp } from '../../square_link_library/HandleMouseUpMultiplayer';

const GameRoomMultiplayer = () => {
    const {
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

        if (!lobbyId) {
            navigate("/dashboard");
        }


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
            navigate("/end");
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
                        <Link to="/end">
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
                                x={circles[square.start].cx + 25}
                                y={circles[square.start].cy + 25}
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