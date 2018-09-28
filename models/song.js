var mongoose = require('mongoose')

var songSchema = new mongoose.Schema({
  title: String,
  artist: String,
  link: String
})

module.exports = mongoose.model('Song', songSchema)
