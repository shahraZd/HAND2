const express = require('express');
var app = express();
var cors = require('cors')
const passport = require("passport");
const config = require('config');
var http = require('http').createServer(app);

var io = require('socket.io')(http);

var bodyParser = require('body-parser')
var mongoose = require('mongoose');
var multer = require('multer');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads');
  },
  filename: function (req, file, cb) {
    console.log(file);
    cb(null, Date.now() + '-' + file.originalname)
  }
});

var upload = multer({ storage: storage });



app.use(cors())
app.use('/uploads', express.static('./uploads'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//passport Midleware
app.use(passport.initialize());

// DB Config
const db = config.get('mongoURI');
// Connect to Mongo
mongoose
  .connect(db, { 
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
  }) // Adding new mongo url parser
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));



app.get('/', (req, res) => {
  res.send("je suis a l'accueil");
});

app.post('/upload', upload.single('myFile'),
  (req, res, next) => {
    var file = req.file;
    //  console.log(file);
    if (!file) {
      res.send('erreur');
    
    }
    else {
      res.json({ path: '192.168.99.100:3000/' + file.path });
    }
  });

app.use('/player', require('./routes/player'));
app.use('/club', require('./routes/club'));
app.use('/user', require("./routes/user"));
app.use('/auth', require("./routes/auth"));


app.score = { eq1: 0 , eq2 : 0};
app.live = [
  {
      id: 'T1',
      name: 'TN Cup',
      matchs: [
          {
              id: 'M1',
              eq1: 'Equipe 1',
              eq2: 'Equipe 2',
              score1: 7,
              score2: 8,
          },
          {
              id: 'M2',
              eq1: 'TUNISIA',
              eq2: 'ALGERIA',
              score1: 16,
              score2: 8,
          }
      ]
  }
];

io.on('connection', function (socket) {
  console.log("user connected");
  socket.emit('news', { hello: 'world' });

  socket.on('eq1', function (data) {
    console.log("equipe 1 a marqué un but");
    app.score.eq1 += data.but;

    // On va supposer qu'on gère le match d'indice 0 du tournoi d'indice 0
    app.live[0].matchs[0].score1 += data.but;
    console.log({ eq1: app.score.eq1, eq2: app.score.eq2 });
    socket.broadcast.emit('score', { eq1: app.score.eq1, eq2: app.score.eq2 });
    
    // on envoie le nouveau tableau
    socket.broadcast.emit('live', app.live );
  });

  socket.on('eq2', function (data) {
    console.log("equipe 2 a marqué un but");
    app.score.eq2 += 1;
    app.live[0].matchs[0].score2 += data.but;
    console.log({ eq1: app.score.eq1, eq2: app.score.eq2 });
    socket.broadcast.emit('score', { eq1: app.score.eq1, eq2: app.score.eq2 });
    socket.broadcast.emit('live', app.live );
  });
});

http.listen(5000, () => {
  console.log('server started on 5000');
});