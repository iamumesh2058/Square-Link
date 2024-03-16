import "express-async-errors";
import express from "express";
import * as dotenv from 'dotenv';
dotenv.config();
import morgan from "morgan";
import mongoose from "mongoose";
import { Server } from "socket.io";
import http from 'http';
import cors from 'cors';

// INITIALIZING APP
const app = express();
app.use(cors);
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "https://square-link.onrender.com"
    }
})


// ROUTES
import authRoutes from "./routes/authRoutes.js";


// MIDDLEWARE
import errorHandlerMiddleware from './middleware/errorHandlerMiddleware.js';

if (process.env.NODE_ENV === 'developemnt') {
    app.use(morgan("dev"));
}


app.use(express.json());


// USING ROUTES
app.use("/api/auth", authRoutes);


app.use('*', (req, res) => {
    res.status(404).json({ msg: 'not found' });
});

app.use(errorHandlerMiddleware);


// STARTING SERVER
const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.MONGODB_URL)
    .then(() => {
        console.log("Database connected successfully");
        app.listen(PORT, () => {
            console.log("Server running : ", PORT);
        });
    })
    .catch((error) => {
        console.log("Error during database connection");
    });


const lobbies = {};

io.on('connection', (socket) => {
    console.log("New client connected: ", socket.id);

    socket.on('createLobby', (rows, cols) => {
        if (!lobbies[socket.id]) {
            lobbies[socket.id] = {
                lobbyId: socket.id,
                rows: rows,
                cols: cols,
                gameStarted: false,
                playerTurn: [],
                players: [],
                availableColors: ["blue", "green", "red", "black"],
                lines: [],
                squares: [],
            };
            console.log("Lobby Created: ", socket.id);
            console.log("Lobbies map now looks like this: ", lobbies);
            io.to(socket.id).emit("lobbyCreated", socket.id);
        } else {
            console.log("Lobby already exists: ", socket.id);
        }
    });

    // Handle lobby joining
    socket.on('joinLobby', (lobbyId, playerName) => {
        console.log(`${playerName} wants to join "${lobbyId}"`);
        if (lobbies[lobbyId]) {
            if (!lobbies[lobbyId].gameStarted) {
                console.log("The length of colors: ", lobbies[lobbyId].availableColors.length);
                if (!lobbies[lobbyId].players.some(obj => obj.playerId === socket.id)) {
                    if (!(lobbies[lobbyId].availableColors.length === 0)) {
                        const playerId = socket.id;
                        const playerColor = lobbies[lobbyId].availableColors.pop();

                        lobbies[lobbyId].playerTurn.push(socket.id);

                        lobbies[lobbyId].players.push({
                            playerId: playerId,
                            playerName: playerName,
                            playerColor: playerColor,
                            playerScore: 0,
                        });

                        socket.join(lobbyId);
                        console.log("Lobby updated: ", lobbies[lobbyId]);
                        socket.emit("lobbyJoined", playerId, playerColor);
                        io.to(lobbyId).emit('lobbyUpdated', lobbies[lobbyId]);
                    } else {
                        socket.emit("lobbyJoinedFail", { errorCode: 4, error: "There are already four players in the lobby. You cannot enter." });
                    }
                } else {
                    socket.emit("lobbyJoinedFail", { errorCode: 3, error: "You've already entered the lobby" });
                }
            } else {
                socket.emit("lobbyJoinedFail", { errorCode: 2, error: "Game has already started. You cannot enter." });
            }
        } else {
            socket.emit('lobbyJoinedFail', { errorCode: 1, error: "This lobby doesn't exist right now. You cannot enter." });
        }
    });

    socket.on("linesChanged", (lobbyId, line, newSquares) => {
        if (lobbies[lobbyId]) {
            //for a player to change state of a lobby he must be in that lobby
            if (lobbies[lobbyId].players.some(obj => obj.playerId === socket.id)) {
                lobbies[lobbyId].lines = [...lobbies[lobbyId].lines, line];
                lobbies[lobbyId].squares = [...lobbies[lobbyId].squares, ...newSquares];
                lobbies[lobbyId].players.find(obj => obj.playerId === socket.id).playerScore += newSquares.length;

                if (newSquares.length === 0) {
                    const removedTurn = lobbies[lobbyId].playerTurn.shift();
                    lobbies[lobbyId].playerTurn.push(removedTurn);
                }

                console.log("Lobby updated: ", lobbies[lobbyId]);
                io.to(lobbyId).emit('lobbyUpdated', lobbies[lobbyId]);
            }
        }
    });

    // Handle game start
    socket.on('startGame', (lobbyId) => {
        if (lobbies[lobbyId]) {
            console.log(`Game started in lobby "${lobbyId}"`);
            lobbies[lobbyId].gameStarted = true;
            io.to(lobbyId).emit('gameStarted');
        }
    });

    // Handle disconnect
    socket.on('disconnect', () => {
        console.log('Client disconnected:', socket.id);

        //if creator left lobby
        if (lobbies[socket.id]) {
            io.to(socket.id).emit('lobbyJoinedFail', { errorCode: 5, error: "Creator of this lobby has left." });
            delete lobbies[socket.id];
        }

        // Remove the player from the lobby if they disconnect
        Object.keys(lobbies).forEach(lobbyId => {
            if (lobbies[lobbyId].players.some(obj => obj.playerId === socket.id)) {
                console.log(`${socket.id} left lobby "${lobbyId}"`);
                //remove player turn
                lobbies[lobbyId].playerTurn = lobbies[lobbyId].playerTurn.filter(obj => obj !== socket.id);
                //push player color back
                lobbies[lobbyId].availableColors.push(lobbies[lobbyId].players.find(obj => obj.playerId === socket.id).playerColor);
                lobbies[lobbyId].players = lobbies[lobbyId].players.filter(obj => obj.playerId !== socket.id);
                io.to(lobbyId).emit('lobbyUpdated', lobbies[lobbyId]);

                //End game if all players left the lobby
                if (lobbies[lobbyId].players.length === 1 && lobbies[lobbyId].gameStarted) {
                    console.log(`Game ended in lobby "${lobbyId}"`);
                    io.to(lobbyId).emit('lobbyJoinedFail', { errorCode: 6, error: "All players have left the lobby." });
                }
            }
        });
    });

});