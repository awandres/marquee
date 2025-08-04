const fs = require('fs')
const path = require('path')

class Logger {
  constructor() {
    this.logDir = path.join(__dirname, '../logs')
    this.ensureLogDir()
  }

  ensureLogDir() {
    if (!fs.existsSync(this.logDir)) {
      fs.mkdirSync(this.logDir, { recursive: true })
    }
  }

  formatMessage(level, message, data = null) {
    const timestamp = new Date().toISOString()
    const logEntry = {
      timestamp,
      level,
      message,
      ...(data && { data }),
      pid: process.pid
    }
    return JSON.stringify(logEntry)
  }

  writeToFile(filename, message) {
    const logFile = path.join(this.logDir, filename)
    fs.appendFileSync(logFile, message + '\n')
  }

  info(message, data = null) {
    const logMessage = this.formatMessage('INFO', message, data)
    console.log(`ℹ️  ${message}`, data || '')
    this.writeToFile('app.log', logMessage)
  }

  error(message, error = null) {
    const errorData = error ? {
      message: error.message,
      stack: error.stack,
      name: error.name
    } : null
    
    const logMessage = this.formatMessage('ERROR', message, errorData)
    console.error(`❌ ${message}`, error || '')
    this.writeToFile('error.log', logMessage)
    this.writeToFile('app.log', logMessage)
  }

  warn(message, data = null) {
    const logMessage = this.formatMessage('WARN', message, data)
    console.warn(`⚠️  ${message}`, data || '')
    this.writeToFile('app.log', logMessage)
  }

  debug(message, data = null) {
    if (process.env.NODE_ENV !== 'production') {
      const logMessage = this.formatMessage('DEBUG', message, data)
      console.log(`🐛 ${message}`, data || '')
      this.writeToFile('debug.log', logMessage)
    }
  }

  success(message, data = null) {
    const logMessage = this.formatMessage('SUCCESS', message, data)
    console.log(`✅ ${message}`, data || '')
    this.writeToFile('app.log', logMessage)
  }
}

module.exports = new Logger()