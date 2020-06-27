const express = require('express');

const app = express();

const path = require('path');

const mongoose = require('mongoose');

require('dotenv').config();

const cors = require('cors');

const errorHandler = require('./middlewares/error-handler');

// Routes
const userRoutes = require('./routes/user');

// Middlewares
app.use(express.json());
app.use(cors({ origin: process.env.ANGULAR_PORT }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/user', userRoutes);

app.get('/', (req, res, next) => {
    res.send({ message: 'Default route' });
});

app.use(errorHandler);

// Database Connection
mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true })
    .catch(function (reason) {
        console.log('Unable to connect to the mongodb instance. Error: ', reason);
    });

// Server 
const server = app.listen(3200, () => { console.log("Server is running.") });

// Socket.IO
const io = require('socket.io')(server);
io.on('connection', socket => {
    console.log('Websockets connected.');
});


