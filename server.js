let express = require('express'),
    bodyParser = require('body-parser'),
    cors = require('cors'),
    mongoose = require("mongoose"),
    socketIO  = require("socket.io"),
    http = require("http"),
    Song = require("./models/song"),
    User = require("./models/user"),
    path = require('path'),
    bcrypt = require('bcrypt-nodejs'),
    serveStatic = require('serve-static'),
    port = process.env.PORT || 5000;

app = express();
app.use(bodyParser.json());
app.use(cors());

// Server static files from Vue app
app.use(serveStatic(__dirname + "/dist"));

// For bcrypt
const saltRounds = 10;

// Connect to mongoDB
mongoose.connect(process.env.DB_URL, { useNewUrlParser: true }, () => {
  console.log("Connected to mongoDB");
});

// Server instance
const server = http.createServer(app);
// Create socket using instance of server
const io = socketIO(server);

// Socket connection handler
io.on("connection", (socket) => {
  console.log(socket.id + " Connected");

  socket.on('joinroom', (room) => {
    console.log(socket.id + ` is joining ${room}'s room`);
    socket.join(room);
    socket.to(room).emit('newMember', socket.id);
  });

  socket.on('updateSinglePlayer', (data) => {
    console.log(socket.id + ` sending state:${data.state}, time:${data.time}, url:${data.url} to ${data.client}`);
    socket.to(data.client).emit('updatePlayer', {state: data.state, time: data.time, url: data.url});
  })

  socket.on('updateAll', (data) => {
    if (data.room !== null) {
      console.log(socket.id + ` sending state:${data.state}, time:${data.time}, url:${data.url} to all`);
      socket.to(data.room).emit('updatePlayer', {state: data.state, time: data.time, url: data.url});
    }
  })

  socket.on('queueEnded', (data) => {
    if (data.room !== null) {
      console.log(socket.id + ` stopping all players in ${data.room}'s room`)
      socket.to(data.room).emit('stopPlayer', '')
    }
  })

  socket.on('message', (data) => {
    if (data.room !== null) {
      console.log('From', data)
      console.log(socket.id + ` sending message ${data.message} to ${data.room}'s room`)
      let author = data.username || 'User ' + socket.id
      socket.to(data.room).emit('message', {author, message: data.message})
    }
  })

  socket.on('disconnect', () => {
    console.log(socket.id + " Disconnected");
  });

});

// Routes
// Get songs
app.get("/songs", (req, res) => {
  Song.find({}, (err, allSongs) => {
    if(err) {
      console.log(err);
      res.status(400).send(err.message);
    } else {
      res.json(allSongs);
    }
  });
});

// Get all songs
app.post('/songs', (req, res) => {
  let title = req.body.title;
  let artist = req.body.artist || '';
  let link = req.body.link;

  // Add song
  Song.create({title, artist, link}, (err, newSong) => {
    if (err) {
      console.log(err);
      res.status(400).send(err.message);
    } else {
      // Send new object back
      res.setHeader('Content-Type', 'application/json');
      res.send(JSON.stringify(newSong));
    }
  });
});

// Delete song
app.delete("/songs", (req, res) => {
  let id = req.body.id;
  Song.findByIdAndDelete(id, (err) => {
    if(err) {
      console.log(err);
      res.status(400).send(err.message);
    } else {
      res.sendStatus(200);
    }
  });
});

// Edit song
app.put("/songs", (req, res) => {
  let title = req.body.title;
  let artist = req.body.artist || '';
  let link = req.body.link;

  Song.findByIdAndUpdate(req.body.id, {title, artist, link}, (err, updatedSong) => {
    if(err) {
      console.log(err);
      res.status(400).send(err.message);
    } else {
      // Send updated object back
      res.setHeader('Content-Type', 'application/json');
      res.send(JSON.stringify(updatedSong));
    }
  });
});

app.get('/user/i/:id', (req, res) => {
  User.find({_id: req.params.id}, (err, user) => {
    if (user !== undefined && user.length > 0) {
      // User exists
      res.writeHead(200, {'Content-type': 'application/json'});
      res.end(JSON.stringify(user[0].username));
    } else {
      res.writeHead(404);
      res.end();
    }
  });
});

app.get('/user/u/:username', (req, res) => {
  User.find({username: req.params.username}, (err, user) => {
    if (user !== undefined && user.length > 0) {
      // User exists
      res.writeHead(200, {'Content-type': 'application/json'});
      res.end(JSON.stringify(user[0]._id));
    } else {
      res.writeHead(404);
      res.end();
    }
  });
});

app.post('/register', (req, res) => {
  let username = req.body.username;
  let password = req.body.password;

  // Ensure username is unique
  User.find({username: username}, (err, user) => {
    if (user !== undefined && user.length > 0) {
      // Username already exists
      res.writeHead(409);
      res.end();
    } else {
      // Add user to database
      bcrypt.hash(password, null, null, function(err, hash) {
        User.create({username: username, password: hash}, (err, newUser) => {
          if (err) {
            console.log(err);
          } else {
            // Successful creation
            res.writeHead(200, {'Content-type': 'application/json'});
            res.end(JSON.stringify({id: newUser._id, username: newUser.username}));
          }
        });
      });
    }
  });
});

app.post('/login', (req, res) => {
  let username = req.body.username;
  let password = req.body.password;
  // Verify login
  User.find({username: username}, (err, user) => {
    if (user === undefined || user.length == 0) {
      // Username does not exist
      res.writeHead(401, {'Content-type': 'application/json'});
      res.end();
    } else {
      // Check password
      bcrypt.compare(password, user[0].password, function(err, equivalent) {
        if(equivalent === true) {
          // Successful login, retrieve data for results page
          res.writeHead(200, {'Content-type': 'application/json'});
          res.end(JSON.stringify({id: user[0]._id, username: user[0].username}));
        } else {
          // Incorrect password
          res.writeHead(401);
          res.end();
        }
      });
    }
  });
});

// The "catchall" handler: for any request that doesn't
// match one above, send back Vue's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + "/dist/index.html"));
});

server.listen(port, () => {
  console.log(`Server is running on port ${port}...`);
});
