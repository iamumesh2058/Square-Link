//CheckSquare.js
export const checkSquare = (row, col, startIndex, index, lines, squares, setSquares, myLobby, setMyLobby, lobbyId, socket, playerId, playerColor, playerName) => {
    let newSquares = [];

    if (//up
        ((lines.findIndex(line => line.start === startIndex - col && line.end === index - col)) !== -1) &&
        ((lines.findIndex(line => line.start === startIndex - col && line.end === startIndex)) !== -1) &&
        ((lines.findIndex(line => line.start === index - col && line.end === index)) !== -1)
    ) {
        console.log("Player has scored up.");
        newSquares = [...newSquares, { start: startIndex - col, playerInitials: playerName.charAt(0), color: playerColor }];
    }

    if ( //down
        ((lines.findIndex(line => line.start === startIndex + col && line.end === index + col)) !== -1) &&
        ((lines.findIndex(line => line.start === startIndex && line.end === startIndex + col)) !== -1) &&
        ((lines.findIndex(line => line.start === index && line.end === index + col)) !== -1)
    ) {
        console.log("Player has scored down.");
        newSquares = [...newSquares, { start: startIndex, playerInitials: playerName.charAt(0), color: playerColor }];
    }

    if ( //left
        ((lines.findIndex(line => line.start === startIndex - 1 && line.end === index - 1)) !== -1) &&
        ((lines.findIndex(line => line.start === startIndex - 1 && line.end === startIndex)) !== -1) &&
        ((lines.findIndex(line => line.start === index - 1 && line.end === index)) !== -1)
    ) {
        console.log("Player has scored left.");
        newSquares = [...newSquares, { start: startIndex - 1, playerInitials: playerName.charAt(0), color: playerColor }];
    }

    if ( //right
        ((lines.findIndex(line => line.start === startIndex + 1 && line.end === index + 1)) !== -1) &&
        ((lines.findIndex(line => line.start === startIndex && line.end === startIndex + 1)) !== -1) &&
        ((lines.findIndex(line => line.start === index && line.end === index + 1)) !== -1)
    ) {
        console.log("Player has scored right.");
        newSquares = [...newSquares, { start: startIndex, playerInitials: playerName.charAt(0), color: playerColor }];
    }

    setSquares([...squares, ...newSquares]);

    socket.emit("linesChanged",
        lobbyId,
        { start: startIndex, end: index, color: playerColor },
        newSquares
    );

}