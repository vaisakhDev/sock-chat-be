const http = require('http');
const express = require('express');
const cors = require('cors');
const morgan = require("morgan");

const app = express();
app.use(morgan('tiny'));
app.use(cors());

const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {cors : {
    origins: ['http://localhost:4200'],
 }},);

app.get('/', (req, res) => {
    res.send("Hello World");
})

io.on('connection', (socket) => {  
    console.log('A user connected');
    console.log(socket.id);
    socket.on('message', msg => {
        console.log(msg);
        socket.broadcast.emit('message', msg);
    })
    socket.on('notification', msg => {
        console.log(msg);
        io.emit('notification', msg);
    })
});

server.listen(process.env.PORT || 8080, () => {
    console.log(`App started`);

})