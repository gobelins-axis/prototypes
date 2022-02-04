// Utils
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const SerialPort = require('serialport');

// Config
require('dotenv').config();

// Configure server
const serverPort = 6842;
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors({
    origin: '*',
}));

app.listen(serverPort, () => {
    console.log(`Server running on port http://localhost:${serverPort}\n`);
});

app.post('/go', (req, res) => {
    const body = req.body;

    setLedColor(body.color);

    res.sendStatus(200);
});

// Open Serial port
const port = new SerialPort(process.env.PORT, { baudRate: 9600 });
port.on('open', () => {
    console.log('serial port open');
});

// Listen serial port data reception
port.on('data', (data) => {
    console.log('Received from Arduino', data.toString());
});

// Interact with arduino
function setLedColor(color) {
    let colorChar = '';

    if (color === 'red') colorChar = 'r';
    if (color === 'blue') colorChar = 'b';

    port.write(color, (err) => {
        if (err) return console.log('Error on write: ', err.message);
        console.log('message written');
    });
}