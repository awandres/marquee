const mongoose = require('mongoose')

// Configure Mongoose to use native promises and suppress deprecation warnings
mongoose.Promise = global.Promise

const connectDB = async () => {
  try {
    const mongoURI = process.env.NODE_ENV === "production" 
      ? process.env.MLAB_URL 
      : 'mongodb://localhost/marquee'
    
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true
    })
    
    console.log(`MongoDB Connected: ${mongoose.connection.host}`)
  } catch (error) {
    console.error('Database connection error:', error.message)
    process.exit(1)
  }
}

// Handle connection events
mongoose.connection.on('connected', () => {
  console.log('Mongoose connected to MongoDB')
})

mongoose.connection.on('error', (err) => {
  console.error('Mongoose connection error:', err)
})

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose disconnected from MongoDB')
})

// Graceful shutdown
process.on('SIGINT', async () => {
  try {
    await mongoose.connection.close()
    console.log('Mongoose connection closed through app termination')
    process.exit(0)
  } catch (error) {
    console.error('Error during graceful shutdown:', error)
    process.exit(1)
  }
})

connectDB()

module.exports = mongoose
