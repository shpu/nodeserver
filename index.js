const express = require('express');

const app = express();

let anime = [
    {
        id: 1,
        name: 'Boku no Pico'
    },
    {
        id:2,
        name: 'Fok Fok Literature Club'
    },
    {
        id:3,
        name: 'Dick'
    },
    {
        id:3,
        name: 'Van'
    }
];

app.get('/', function (req, res) {
    res.send('OK');
})

app.get('/anime', function (req, res) {
    res.send(anime);
})

app.listen(3000, function () {
   console.log('Server -- OK');
})