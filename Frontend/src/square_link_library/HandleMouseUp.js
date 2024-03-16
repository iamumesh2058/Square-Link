//HandleMouseUp.js
import { checkSquare } from "./CheckSquare";

export const handleMouseUp = (index, row, col, lines, setLines, startIndex, setStartIndex, player, setPlayer, scores, setScores, squares, setSquares) => {

    //something must be clicked thus handle down must be pressed
    if (startIndex === null) return;
    if (startIndex === index) return;

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
            setLines([...lines, { start: startIndex, end: index }]);
            checkSquare(row, col, startIndex, index, lines, squares, setSquares, player, scores, setScores, setPlayer);
        } else {
            if ((lines.findIndex(line => line.start === index && line.end === startIndex)) !== -1) return;
            setLines([...lines, { start: index, end: startIndex }]);
            checkSquare(row, col, index, startIndex, lines, squares, setSquares, player, scores, setScores, setPlayer);
        }

    }

    setStartIndex(null);

};