const express = require('express')
const http = require('http');
const socketio = require('socket.io');

const app = express()
// createServer() requires the http server and creates a socket out of it, i.e websocket
const server = http.createServer(app);
const io = socketio(server);

// this is a middleware, it just maps all of your static assets, like we have defined all static file in public folder here.
app.use('/', express.static(__dirname + "/public"))

io.on('connection', (socket) => {
    console.log('User Connected', socket.id)

    socket.on('msg_send', (data) => {
        console.log(data)
        io.emit('msg_rcvd', data)   // for all client
        // socket.emit('msg_rcvd', data) // for same client
        // socket.brodcast.emit('msg_rcvd', data) // for all the client except self
    })
})

server.listen(3000, () => {
    console.log('Server Started')
})