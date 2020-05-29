const express = require('express');
const app = express();
const http = require('http').createServer(app);
var io = require('socket.io')(http);

const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors');
const authorize = require('./routes/private');


//Middlewares
app.use(express.json());
app.use(cors({ origin: process.env.ANGULAR_PORT }));

//ROUTES

//handle login and register
const authRoute = require('./routes/auth');
app.use('/user', authRoute);

//handle callbreak game creation and game update
const callbreakRoute = require('./routes/callbreak');
app.use('/callbreak', authorize);
app.use('/callbreak', callbreakRoute);

// handle viewing games-history
const historyRoute = require('./routes/history');
app.use('/history', authorize);
app.use('/history', historyRoute);

// Default Route
app.get('/', (req, res) => {
    res.send('<h1>Backend Home</h1>');
});


// WEB SOCKETS
io.on('connection', (socket) => {
    socket.on('entered', (user) => {
        io.emit('user joined', { user: user });
    });

    socket.on('disconnect', () => {
    });

    socket.on('message sent', (data) => {
        io.emit('msg received', { user: data.user, message: data.message });
    });
});


// Connect to DB
mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true })
    .catch(function (reason) {
        console.log('Unable to connect to the mongodb instance. Error: ', reason);
    });

// listen to the server
http.listen(3000, () => { console.log("Server is running.") });
