let express = require('express'),
    path = require('path'),
    serveStatic = require('serve-static'),
    port = process.env.PORT || 5000;

app = express();
app.use(serveStatic(__dirname + "/dist"));

// The "catchall" handler: for any request that doesn't
// match one above, send back Vue's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + "/dist/index.html"));
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}...`);
});
