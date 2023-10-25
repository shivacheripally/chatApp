const express = require('express');
const cors = require('cors');
const {Server} = require('socket.io');
const http = require('http');
const port = 8000;
const app = express();

const server = http.createServer(app);

const io = new Server(server, {
    cors:{
        origin:'*',
        mathods:["GET", "POST"]
    }
});

//3.use socket event
io.on('connection', (socket)=>{
    console.log('Connection Is Established');

    socket.on("join", (data)=>{
        socket.username = data;
    })

    socket.on('new_message', (message)=>{
        
        let userMessage = {
            username: socket.username,
            message: message
        }

        socket.broadcast.emit('broadcat_message', userMessage);
    })

    socket.on('disconnect', ()=>{
        console.log('Connection Is Disconnected');
    })
})

server.listen(port,function(err){
    if(err){
        console.log(`Error while server is up: ${err}`);
        return;
    }
    console.log(`Server is up and running on port: ${port}`);
})