const express = require('express');

const http = require('http');

const app = express();

const server = http.createServer(app);

const io = require('socket.io')(server);

const mongoose = require('mongoose');

require('dotenv').config();

const cors = require('cors');

//Middlewares
app.use(express.json());
app.use(cors({ origin: process.env.ANGULAR_PORT }));

/* Routes */
const callbreakRoute = require('./routes/callbreak');
app.use('/callbreak', callbreakRoute);

app.get('/', (req, res) => {
    res.send('<h1>Backend Home</h1>'); // use Pug or EJS
});

/* Web Sockets */
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

/* Database Connection */
mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true })
    .catch(function (reason) {
        console.log('Unable to connect to the mongodb instance. Error: ', reason);
    });

server.listen(3000, () => { console.log("Server is running.") });
