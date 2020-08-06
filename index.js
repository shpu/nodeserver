const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;


const PORT = process.env.PORT || 3000;
const app = express();

let anime = [
    {
        id: 1,
        name: 'Boku no Pico'
    },
    {
        id: 2,
        name: 'Fok Fok Literature Club'
    },
    {
        id: 3,
        name: 'Dick'
    },
    {
        id: 4,
        name: 'Van'
    }
];

app.get('/', function (req, res) {
    res.send('OK');
})

app.get('/anime', function (req, res) {
    res.send(anime);
})

app.get('/anime/:id', function (req, res) {
    console.log(req.params);
    var anima = anime.find(function (anima)
    {
        return anima.id === Number(req.params.id)
    });
    res.send(anima);
})

app.listen(3000, function () {
   console.log('Server -- OK');
})