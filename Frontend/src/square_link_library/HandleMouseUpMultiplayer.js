//HandleMouseUp.js
import { checkSquare } from "./CheckSquareMultiplayer";

export const handleMouseUp = (index, row, col, lines, setLines, startIndex, setStartIndex, squares, setSquares, myLobby, setMyLobby, lobbyId, socket, playerId, playerColor, playerName ) => {

    //something must be clicked thus handle down must be pressed
    if (startIndex === null) return;
    if (startIndex === index) return;
    if(myLobby.playerTurn[0] !== playerId) return;

    let startRow = Math.floor(startIndex / col);
    let startCol = startIndex % col;
    let endRow = Math.floor(index / col);
    let endCol = index % col;

    if (
        (startRow === endRow && Math.abs(startCol - endCol) <= 1) ||
        (startCol === endCol && Math.abs(startRow - endRow) <= 1)
    ) {
        if (startIndex < index) {
            if ((lines.findIndex(line => line.start === startIndex && line.end === index)) !== -1) return;
            setLines([...lines, { start: startIndex, end: index, color: {playerColor} }]);
            checkSquare(row, col, startIndex, index, lines, squares, setSquares, myLobby, setMyLobby, lobbyId, socket, playerId, playerColor, playerName );
        } else {
            if ((lines.findIndex(line => line.start === index && line.end === startIndex)) !== -1) return;
            setLines([...lines, { start: index, end: startIndex, color: {playerColor} }]);
            checkSquare(row, col, index, startIndex, lines, squares, setSquares, myLobby, setMyLobby, lobbyId, socket, playerId, playerColor, playerName );
        }

    }

    setStartIndex(null);

};