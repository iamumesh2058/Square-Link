import React, { useEffect, useState } from 'react';
import { useDashboardContext } from '../DashboardLayout/DashboardLayout';
import { minimax } from "../../square_link_library/Minimax";
import { handleMouseUp } from '../../square_link_library/HandleMouseUp';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import Wrapper from './GameRoom.style';


const GameRoom = () => {
    const { rows, cols, gameLevel } = useDashboardContext();
    const [allLines, setAllLines] = useState([]);
    const [circles, setCircles] = useState([]);
    const [lines, setLines] = useState([]);
    const [startIndex, setStartIndex] = useState(null);
    const [player, setPlayer] = useState(1);
    const [scores, setScores] = useState({ 1: 0, 2: 0 });
    const [squares, setSquares] = useState([]);
    const [againstComputer, setAgainstComputer] = useState(true);

    useEffect(() => {
        console.log(gameLevel);
        console.log(rows);
        console.log(cols);
        let tempLines = [];

        // Generate horizontal lines
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols - 1; j++) {
                const start = i * cols + j;
                const end = start + 1;
                tempLines.push({ start, end });
            }
        }
    
        // Generate vertical lines
        for (let i = 0; i < rows - 1; i++) {
            for (let j = 0; j < cols; j++) {
                const start = i * cols + j;
                const end = start + cols;
                tempLines.push({ start, end });
            }
        }
        setAllLines(tempLines);
        console.log(tempLines);

        let tempCircles = [];
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                tempCircles.push({ cx: j * 75 + 25, cy: i * 75 + 25 });
            }
        }
        setCircles(tempCircles);
        // console.log(tempCircles);
    }, [rows, cols]);

    // CALLING MINMAX
    useEffect(() => {
        if (player === 1 && againstComputer) {
            let remainingLines = allLines.filter(line => !lines.some(item2 => line.start === item2.start && line.end === item2.end));

            let alpha = { start: null, end: null, score: -999 };
            let beta = { start: null, end: null, score: 999 };
            let searchDepth;

            if (gameLevel === 'Easy') searchDepth = 3;
            if (gameLevel === 'Medium') searchDepth = 6;
            if (gameLevel === "Hard") {
                searchDepth = 8;
                if (remainingLines.length < 17) {
                    searchDepth = 17;
                }
            }
            
            setTimeout(() => {
                let { start, end, returnscore } = minimax(remainingLines, lines, scores[2], scores[1], true, cols, alpha, beta, searchDepth);
                setStartIndex(start);
                handleMouseUp(end, rows, cols, lines, setLines, startIndex, setStartIndex, player, setPlayer, scores, setScores, squares, setSquares);
            }, 1000);
        }
    }, [player, startIndex, allLines]);

    return (
        <Wrapper>
            <div className="main-content-gameroom">
                <div className="gamestats">

                    <div className="players-list">
                        <h4>Players:</h4>
                        <ol type='1'>
                            <li>Computer: {scores[1]}</li>
                            {/* <li>{playerName ? playerName : "Human Player"}: {scores[2]}</li> */}
                            <li>Human Player: {scores[2]}</li>
                        </ol>
                    </div>

                    <div className="invite-link">
                        <Link to="/dashboard" className="btn btn-form">End!</Link>
                    </div>
                </div>

                <div className="gameboard-container">
                    <h5>{player === 1 ? "Computer" : "Player"}s' Turn</h5>
                    <div className="gameboard">
                        <svg width="800" height="500">

                            {circles.map((circle, index) => (
                                <circle
                                    cx={circle.cx}
                                    cy={circle.cy}
                                    r={15}
                                    fill='var(--primary-500)'
                                    stroke="var(--text-color)"
                                    onMouseDown={() => setStartIndex(index)}
                                    onMouseUp={(e) => handleMouseUp(index, rows, cols, lines, setLines, startIndex, setStartIndex, player, setPlayer, scores, setScores, squares, setSquares)}
                                    key={index}
                                />
                            ))}

                            {lines.map((line, index) => (
                                <line
                                    x1={circles[line.start].cx}
                                    y1={circles[line.start].cy}
                                    x2={circles[line.end].cx}
                                    y2={circles[line.end].cy}
                                    stroke="var(--text-color)"
                                    key={index}
                                />
                            ))}

                            {squares.map((square, index) => (
                                <text
                                    key={index}
                                    x={circles[square.start].cx + 36}
                                    y={circles[square.start].cy + 36}
                                    fontSize="20"
                                    fill="var(--text-color)"
                                    textAnchor="middle"
                                    dominantBaseline="central"
                                >
                                    {square.player}
                                </text>
                            ))}

                        </svg>
                    </div>
                </div>
            </div>
        </Wrapper>
    )
}

export default GameRoom;