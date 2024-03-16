function checkSquare(line, simulatedLines, col) {
    let tempscore = 0;

    let lineStart = line.start;
    let lineEnd = line.end;

    if (//up
        ((simulatedLines.findIndex(line => line.start === lineStart - col && line.end === lineEnd - col)) !== -1) &&
        ((simulatedLines.findIndex(line => line.start === lineStart - col && line.end === lineStart)) !== -1) &&
        ((simulatedLines.findIndex(line => line.start === lineEnd - col && line.end === lineEnd)) !== -1)
    ) {
        // console.log("Up");
        tempscore++;
    }

    if ( //down
        ((simulatedLines.findIndex(line => line.start === lineStart + col && line.end === lineEnd + col)) !== -1) &&
        ((simulatedLines.findIndex(line => line.start === lineStart && line.end === lineStart + col)) !== -1) &&
        ((simulatedLines.findIndex(line => line.start === lineEnd && line.end === lineEnd + col)) !== -1)
    ) {
        // console.log("Down");
        tempscore++;
    }

    if ( //left
        ((simulatedLines.findIndex(line => line.start === lineStart - 1 && line.end === lineEnd - 1)) !== -1) &&
        ((simulatedLines.findIndex(line => line.start === lineStart - 1 && line.end === lineStart)) !== -1) &&
        ((simulatedLines.findIndex(line => line.start === lineEnd - 1 && line.end === lineEnd)) !== -1)
    ) {
        // console.log("Left");
        tempscore++;
    }

    if ( //right
        ((simulatedLines.findIndex(line => line.start === lineStart + 1 && line.end === lineEnd + 1)) !== -1) &&
        ((simulatedLines.findIndex(line => line.start === lineStart && line.end === lineStart + 1)) !== -1) &&
        ((simulatedLines.findIndex(line => line.start === lineEnd && line.end === lineEnd + 1)) !== -1)
    ) {
        // console.log("Right");
        tempscore++;
    }

    return tempscore;
}


function memoize(func) {
    const cache = new Map();
    return function (...args) {
        const [remainingLines, simulatedLines] = args;
        const key = JSON.stringify(args.filter(arg => arg !== simulatedLines));
        if (cache.has(key)) {
            // console.log("This was cached");
            // console.log(key);
            return cache.get(key);
        }
        const result = func.apply(this, args);
        cache.set(key, result);
        return result;
    }
}


export const minimax = memoize(function (remainingLines, simulatedLines, humanScore, computerScore, computerTurn, col, alpha, beta, searchDepth) {
    searchDepth--;

    if (remainingLines.length === 0 || searchDepth === 0) return { start: null, end: null, score: computerScore - humanScore };

    let evalLine;

    if (remainingLines.length === 1) {
        let tempscore = checkSquare(remainingLines[0], simulatedLines, col);

        if (computerTurn) {
            if (tempscore > 0) {
                computerScore += tempscore;
            }
        } else {
            if (tempscore > 0) {
                humanScore += tempscore;
            }
        }

        return { start: remainingLines[0].start, end: remainingLines[0].end, score: computerScore - humanScore };
    }

    if (computerTurn) {
        let maxLine = { start: null, end: null, score: -999 };
        //GENERATE ALL CHILDREN AND EVALUATE HOW GAME GOES FOR EACH CHILDREN
        for (let i = 0; i < remainingLines.length; i++) {
            let tempscore = checkSquare(remainingLines[i], simulatedLines, col);

            evalLine = minimax(remainingLines.filter((_, index) => index !== i), [...simulatedLines, remainingLines[i]], humanScore, tempscore > 0 ? computerScore + tempscore : computerScore, tempscore > 0 ? true : false, col, alpha, beta, searchDepth);

            // This works fine but produces a pattern of line too obvious 
            maxLine = evalLine.score > maxLine.score ? { start: remainingLines[i].start, end: remainingLines[i].end, score: evalLine.score } : maxLine;

            alpha = evalLine.score > alpha.score ? { start: remainingLines[i].start, end: remainingLines[i].end, score: evalLine.score } : alpha;
            if (beta.score <= alpha.score) break;
        }

        return maxLine;
    } else {
        let minLine = { start: null, end: null, score: 999 };
        //GENERATE ALL CHILDREN AND EVALUATE HOW GAME GOES FOR EACH CHILDREN
        for (let i = 0; i < remainingLines.length; i++) {

            let tempscore = checkSquare(remainingLines[i], simulatedLines, col);

            evalLine = minimax(remainingLines.filter((_, index) => index !== i), [...simulatedLines, remainingLines[i]], tempscore > 0 ? humanScore + tempscore : humanScore, computerScore, tempscore > 0 ? false : true, col, alpha, beta, searchDepth);

            //This works fine but produces a pattern of line too obvious 
            minLine = evalLine.score < minLine.score ? { start: remainingLines[i].start, end: remainingLines[i].end, score: evalLine.score } : minLine;

            beta = evalLine.score < beta.score ? { start: remainingLines[i].start, end: remainingLines[i].end, score: evalLine.score } : beta;
            if (beta.score <= alpha.score) break;
        }

        return minLine;
    }
});