//CheckSquare.js
export const checkSquare = (row, col, startIndex, index, lines, squares, setSquares, player, scores, setScores, setPlayer) => {
    let tempsquares = [];
    let tempscore = 0;
    if (//up
        ((lines.findIndex(line => line.start === startIndex - col && line.end === index - col)) !== -1) &&
        ((lines.findIndex(line => line.start === startIndex - col && line.end === startIndex)) !== -1) &&
        ((lines.findIndex(line => line.start === index - col && line.end === index)) !== -1)
    ) {
        console.log("Player" + player + " has scored up.");
        tempsquares = [...tempsquares, { start: startIndex - col, player: player }];
        tempscore++;
    }

    if ( //down
        ((lines.findIndex(line => line.start === startIndex + col && line.end === index + col)) !== -1) &&
        ((lines.findIndex(line => line.start === startIndex && line.end === startIndex + col)) !== -1) &&
        ((lines.findIndex(line => line.start === index && line.end === index + col)) !== -1)
    ) {
        console.log("Player" + player + " has scored down.");
        tempsquares = [...tempsquares, { start: startIndex, player: player }];
        tempscore++;
    }

    if ( //left
        ((lines.findIndex(line => line.start === startIndex - 1 && line.end === index - 1)) !== -1) &&
        ((lines.findIndex(line => line.start === startIndex - 1 && line.end === startIndex)) !== -1) &&
        ((lines.findIndex(line => line.start === index - 1 && line.end === index)) !== -1)
    ) {
        console.log("Player" + player + " has scored left.");
        tempsquares = [...tempsquares, { start: startIndex - 1, player: player }];
        tempscore++;
    }

    if ( //right
        ((lines.findIndex(line => line.start === startIndex + 1 && line.end === index + 1)) !== -1) &&
        ((lines.findIndex(line => line.start === startIndex && line.end === startIndex + 1)) !== -1) &&
        ((lines.findIndex(line => line.start === index && line.end === index + 1)) !== -1)
    ) {
        console.log("Player" + player + " has scored right.");
        tempsquares = [...tempsquares, { start: startIndex, player: player }];
        tempscore++;
    }

    setSquares([...squares, ...tempsquares]);
    setScores({ ...scores, [player]: scores[player] + tempscore });

    if (tempscore===0) {
        setPlayer((player) => player % 2 + 1);
    }

}