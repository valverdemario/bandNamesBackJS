const express = require('express');

const path = require('path');
const app = express();

require('dotenv').config();

// Node server
const server = require('http').createServer(app);
module.exports.io = require('socket.io')(server);
require('./sockets/socket');

// Serve static files from the React app
const publicPath = path.join(__dirname, 'public');

app.use(express.static(publicPath));


server.listen(process.env.PORT, (err) => {
    if (err) {
        console.log(err);
    }

    console.log('Server is running on port ' + process.env.PORT);

});