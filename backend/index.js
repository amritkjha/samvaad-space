const express = require('express');
const connectToDB = require('./db');
var cors = require('cors')
const socketio = require('socket.io')
const http = require('http')

connectToDB();
const app = express()
const server = http.createServer(app);
const io = socketio(server, {
    cors: {
        origin: "*",
    }
});

io.on('connection', (socket) => {
    // console.log("Client connected.");
    socket.on('joinRoom', (room) => {
        socket.join(room);
        console.log(`Client joined ${room} room.`);
    })

    socket.on('leaveRoom', (room) => {
        socket.leave(room);
        console.log(`Client left ${room} room.`);
    })

    socket.on('chatMessage', (message) => {
        io.emit('chatMessage', message)
    })
    socket.on('disconnect', () => {
        console.log("Client disconnected.");
    })
})

const PORT = 5000

app.use(cors())
app.use(express.json());

app.use('/api/auth', require('./routes/auth'))
app.use('/api/community', require('./routes/communities'))

server.listen(PORT, () => {
    console.log("App listening on port: ", PORT)
})