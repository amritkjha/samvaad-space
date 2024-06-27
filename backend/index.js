const express = require('express');
const connectToDB = require('./db');
var cors = require('cors')
const socketio = require('socket.io')
const http = require('http');
const Message = require('./models/Message');

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
    socket.on('joinRoom', async(room) => {
        socket.join(room);
        console.log(`Client joined ${room} room.`);
        const previousMessages = await Message.find({community_id: room});
        socket.emit('previousMessages', previousMessages);
    })

    socket.on('leaveRoom', (room) => {
        socket.leave(room);
        console.log(`Client left ${room} room.`);
    })

    socket.on('chatMessage', async({room, username, message, timestamp}) => {
        const newMessage = new Message({
            community_id : room,
            username,
            message,
            timestamp
        })
        await newMessage.save();
        io.to(room).emit('chatMessage', newMessage)
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