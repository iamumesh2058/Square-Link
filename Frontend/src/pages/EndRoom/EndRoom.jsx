import React, { useEffect, useState } from 'react';
import Wrapper from './EndRoom.Style';
import { useDashboardContext } from '../DashboardLayout/DashboardLayout';
import { Link, redirect, useNavigate } from 'react-router-dom';


const EndRoom = () => {
    const navigate = useNavigate();
    const { myLobby, lobbyId, socket, playerId } = useDashboardContext();
    const winner = localStorage.getItem('Winner');

    useEffect(() => {
        if (!lobbyId || myLobby === null) {
            navigate("/dashboard");
            return
        }

        setTimeout(() => {
            socket.disconnect();
        }, 10000);
    }, [lobbyId]);

    return (
        <Wrapper>
            <div className="gamestats">
                {myLobby &&
                    <div className="players-list">
                        <h3>Winner is: {winner}</h3>
                        <h5>Players:</h5>
                        <ol type='a' className="players-list">
                            {myLobby.players.map((player) => {
                                if (playerId === player.playerId) {
                                    return (
                                        <li key={player.playerId} style={{ color: player.playerColor }}><div className="this-player">{player.playerName} : {player.playerScore}</div></li>
                                    )
                                }
                                return (
                                    <li key={player.playerId} style={{ color: player.playerColor }}>{player.playerName} : {player.playerScore}</li>
                                )
                            })}
                        </ol>
                    </div>
                }

                <Link to="/dashboard" reloadDocument>
                    <button className='btn btn-block'>
                        Start Again!
                    </button>
                </Link>

            </div>
        </Wrapper>
    )
}

export default EndRoom;