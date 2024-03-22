import React from 'react';
import Wrapper from './HistoryComponent.style';
import { useOutletContext } from 'react-router-dom';
import day from 'dayjs';
import advanceFormat from 'dayjs/plugin/advancedFormat';

const History = ({ gameStatus, myScore, opponentScore, opponent, gameLevel, createdAt }) => {
	const { user } = useOutletContext();
	const date = day(createdAt).format('MMM DD, YYYY');
	return (
		<Wrapper>
			<div className={`history-main ${gameStatus}`}>
				<div className="score-details">
					<div className="my-details">
						{user.username} ({myScore})
					</div>
					<h5>{gameStatus}</h5>
					<div className="opponent-details">
						({opponentScore}) {opponent}
					</div>
				</div>
				<div className="other-details">
					{
						opponent === "Computer" &&
						<div className="game-level">
							Game Level : {gameLevel}
						</div>
					}
					<div className="time">
						{date}
					</div>
				</div>

			</div>
		</Wrapper>
	)
}

export default History