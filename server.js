const express = require('express');

const path = require('path');

const app = express();

const mongoose = require('mongoose');

const session = require('express-session');

require('dotenv').config();

const cors = require('cors');

// Views
app.set('view engine', 'ejs');
app.set('views', 'views');

// Middlewares
app.use(express.json());
app.use(cors({ origin: process.env.ANGULAR_PORT }));
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get('/', (req, res, next) => {
    res.render('index');
});

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


