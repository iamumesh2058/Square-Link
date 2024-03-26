import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Wrapper from './GameLobby.style';
import { useDashboardContext } from '../DashboardLayout/DashboardLayout';
import { toast } from 'react-toastify';

const GameLobby = () => {
    const navigate = useNavigate();

    const {
        myLobby,
        lobbyId,
        socket,
        playerName
    } = useDashboardContext();

    console.log(lobbyId)
    
    const lobbyCode = `${lobbyId}`;
    
    
    const path = useParams();
    useEffect(() => {
        // if(!lobbyId || lobbyCode === ''){
        //     navigate("/dashboard");
        //     return;
        // }
        if (path.any === 'create') {
            socket.emit("joinLobby", lobbyId, playerName);
        }

    }, [lobbyId]);
    
    const handleCopy = (event) => {
        navigator.clipboard.writeText(lobbyCode);
        event.target.innerText = 'Copied!';
        setTimeout(() => {
            event.target.innerText = 'Copy';
        }, 1000);
    }

    const handleMultiplayerLobby = () => {
        socket.emit("startGame", lobbyId);
    }

    return (
        <Wrapper>
            <h4>Players:</h4>
            <ol type='a' className='players-list'>
                {
                    myLobby && myLobby.players.map((player) => {
                        return (
                            <li
                                key={player.playerId}
                                style={{ color: player.playerColor }}
                            >
                                {player.playerName}
                            </li>
                        )
                    })
                }
            </ol>

            <div className="invite-link">
                <span>{lobbyCode}</span>
                <button onClick={handleCopy} className="invite">Copy</button>
            </div>

            <div className='enter-game'>
                {
                    myLobby && myLobby.availableColors.length < 3 &&
                    <button className='btn btn-block form-btn' onClick={handleMultiplayerLobby}>
                        Play!
                    </button>
                }
            </div>

        </Wrapper>
    )
}

export default GameLobby;