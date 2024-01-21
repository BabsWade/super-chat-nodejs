/**var app = require('express')(),
    server = require('http').createServer(app),
    io = require('socket.io').listen(server),
    ent = require('ent');// Permet de bloquer les caractères HTML (sécurité équivalente à htmlentities en PHP)

// Chargement de la page index.html
app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});

io.sockets.on('connection', function (socket, pseudo) {
    // Dès qu'on nous donne un pseudo, on le stocke en variable de session et on informe les autres personnes
    socket.on('nouveau_client', function(pseudo) {
        pseudo = ent.encode(pseudo);
        socket.pseudo = pseudo;
        socket.broadcast.emit('nouveau_client', pseudo);
    });

    // Dès qu'on reçoit un message, on récupère le pseudo de son auteur et on le transmet aux autres personnes
    socket.on('message', function (message) {
        message = ent.encode(message);
        socket.broadcast.emit('message', {pseudo: socket.pseudo, message: message});
    });
});

server.listen(8080);
----------------**/
import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import { encode } from 'ent';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Obtient le chemin du répertoire du module
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Configurez express.static pour servir les fichiers statiques
app.use(express.static(__dirname));

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');  // Utiliser res.sendFile
});

io.on('connection', function (socket) {
    socket.on('nouveau_client', function(pseudo) {
        pseudo = encode(pseudo);
        socket.pseudo = pseudo;
        socket.broadcast.emit('nouveau_client', pseudo);
    });

    socket.on('message', function (message) {
        message = encode(message);
        socket.broadcast.emit('message', {pseudo: socket.pseudo, message: message});
    });
});

server.listen(8080);
