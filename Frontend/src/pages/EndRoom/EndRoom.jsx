import React, { useEffect, useState } from 'react';
import Wrapper from './EndRoom.Style';
import { useDashboardContext } from '../DashboardLayout/DashboardLayout';
import { Link, redirect, useNavigate } from 'react-router-dom';


const EndRoom = () => {
    const navigate = useNavigate();
    const { myLobby, lobbyId, socket, playerId } = useDashboardContext();
    const [winner, setWinner] = useState('');

    useEffect(() => {
        if (!lobbyId || myLobby === null) {
            navigate("/dashboard");
            return
        }

        setTimeout(() => {
            socket.disconnect();
        }, 10000);

        if (myLobby && myLobby.players.lenght > 0) {
            const winner = findWinner();
            setWinner(winner);
        }

    }, [lobbyId, myLobby, socket]);

    const findWinner = () => {
        const winner = myLobby.players.reduce((acc, cur) => {
            return cur.playerScore > acc.playerScore ? cur : acc;
        });
        console.log(winner.playerName);
        return winner.playerName;
    }



    return (
        <Wrapper>
            <div className="gamestats">
                {myLobby &&
                    <div className="players-list">
                        <h3>Winner is: {winner.playerName}</h3>
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