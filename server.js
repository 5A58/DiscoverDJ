let express = require('express'),
    bodyParser = require('body-parser'),
    cors = require('cors'),
    path = require('path'),
    serveStatic = require('serve-static'),
    port = process.env.PORT || 5000;

app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(serveStatic(__dirname + "/dist"));

// Routes
app.get('/songs', (req, res) => {
  res.setHeader("Content-type", "application/json");
  res.send(JSON.stringify([
    {
      "id": 1,
      "title": "Song 1 from server"
    },
    {
      "id": 2,
      "title": "Song 2 from server"
    }
  ]));
});

app.post('/register', (req, res) => {
  console.log("Posted")
  res.send({
    message: `Hello ${req.body.username}`
  })
});

// The "catchall" handler: for any request that doesn't
// match one above, send back Vue's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + "/dist/index.html"));
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}...`);
});
