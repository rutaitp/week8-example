//Express server setup
let express = require('express');
let app = express();

//Serve public folder
app.use(express.static('public'));

//Step 2. HTTP Server
let http = require('http');
let server = http.createServer(app);

//Listen
let port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log('Server is listening on localhost: ' + port);
});

//3. Socket connection
const { Server } = require('socket.io');
const io = new Server(server);

//Establish socket server connection
io.on('connection', (socket) => {
  console.log('We have a new client: ' + socket.id);

  //6. Listen for data from the client
  socket.on('data', (data) => {
    console.log(data);

    //7.Emit data to other clients
    //send to all clients, including us
    io.emit('data', data);

    //send to all clients, except us
    //socket.broadcast.emit('data', data);

    //send only to ourselves
    //socket.emit('data', data);
  });

  socket.on('colorChange', () => {
    io.emit('colorChange');
  });

  //3.2. Log id when client disconnects
  socket.on('disconnec', () => {
    console.log('A client disconnected', socket.id);
  });
});
