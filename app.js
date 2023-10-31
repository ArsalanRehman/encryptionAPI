const express = require('express')
const helmet = require('helmet')
const morgan = require('morgan')
const userRouter = require('./routers/userRouter')
const encryptRouter = require('./routers/encryptRouter')
const globalErrorHandler = require('./controllers/errorControler')
const rateLimit = require('express-rate-limit')
const AppError = require('./utils/appError')
const app = express()
app.use(express.json({ limit: '52428800' }))
const cors = require('cors')
var ip = require('ip')
const ipAddress = ip.address()

//////////////////

app.get(helmet())

// Function to generate IP addresses in the Class C subnets 192.168.0.0/24 and 192.168.1.0/24
function generateIPAddresses() {
  const ipAddresses = []
  for (let subnet = 0; subnet <= 255; subnet++) {
    // Loop through both subnets
    for (let i = 1; i <= 255; i++) {
      const ipAddress = `192.168.${subnet}.${i}`
      ipAddresses.push(`http://${ipAddress}`)
      ipAddresses.push(`http://${ipAddress}:3000`)
      ipAddresses.push(`http://${ipAddress}:3001`)
    }
  }
  return ipAddresses
}

const corsOptions = {
  origin: [
    'http://localhost:3000',
    'http://localhost',
    'http://localhost:3001',
    'http://localhost:3002',
    'http://localhost:3003',
    'http://localhost:3004',
    `http://${ipAddress}`,
    `http://${ipAddress}:3000`,
    `http://${ipAddress}:3001`,
    ...generateIPAddresses(),
  ],
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
}

app.use(cors(corsOptions))

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}
const limiter = rateLimit({
  max: 100000,
  windowsMS: 60 * 60 * 1000,
  message: 'request kotaniz acmistir',
})
app.use('/api', limiter)

app.use('/api/v1/users', userRouter)
app.use('/api/v1/encrypt', encryptRouter)

app.use(express.static('images'))

app.all('*', (req, res, next) => {
  next(new AppError(`${req.originalUrl} bulunmamaktadir`, 404))
})
app.use(globalErrorHandler)

module.exports = app
