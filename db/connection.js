const mongoose = require('mongoose')

// mongoose.connect(process.env.MONGOLAB_CRIMSON_URI || 'mongodb://localhost/marquee')
// console.log('db connected')

if (process.env.NODE_ENV == "production") {
  mongoose.connect(process.env.MLAB_URL)
} else {
  mongoose.connect('mongodb://localhost/marquee');
}

module.exports = mongoose
