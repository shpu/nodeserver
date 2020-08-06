const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;


const PORT = process.env.PORT || 3000;
const app = express();
const url = 'mongodb+srv://admin:nopassword@morgtown-data-cluster.dasjj.mongodb.net/morgtown_chat';
let db;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true})); //подключение бодипарсера чтобы переводить запросы в json

MongoClient.connect(url, function (err, client) {
    if (err) {
        console.log(err);
    }
    console.log('DB ---- OK');
    db = client.db('morgtown_chat'); //присоединение к БД
    app.listen(PORT, function () {
        console.log('Server ---- OK');
    })
}) //подключение к БД

app.get('/messages', function (req, res) {
    db.collection("messages").find({}).toArray(function (err, docs) {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        res.send(docs);
    })
}) //ловим данные из БД и отправляем по запросу


app.post('/messages', function (req, res) {
    let newMessage = {
        text: req.body.text //Подготовка данных с фронтенда для пересылки в БД
    }
    db.collection("messages").insert(newMessage, function (res, result) { //отправка сообщения в коллекцию
        if (err) {
            console.log(err);
            return res.sendStatus(500); //ответ код ошибки
        }
        res.sendStatus(200); //ответ код успеха
    })
})


// let anime = [
//     {
//         id: 1,
//         name: 'Boku no Pico'
//     },
//     {
//         id: 2,
//         name: 'Fok Fok Literature Club'
//     },
//     {
//         id: 3,
//         name: 'Dick'
//     },
//     {
//         id: 4,
//         name: 'Van'
//     }
// ];
//
// app.get('/', function (req, res) {
//     res.send('OK');
// })
//
// app.get('/anime', function (req, res) {
//     res.send(anime);
// })
//
// app.get('/anime/:id', function (req, res) {
//     console.log(req.params);
//     var anima = anime.find(function (anima)
//     {
//         return anima.id === Number(req.params.id)
//     });
//     res.send(anima);
// })
//
