const mongoose = require('mongoose')
const dotenv = require('dotenv')
const dotenvExpand = require('dotenv-expand')
dotenv.config({ path: './config.env' })
const app = require('./app')
const cors = require('cors')
app.get(cors())
// const password = encodeURIComponent(process.env.DATABASE_PASSWORD);

const DB = 'mongodb://localhost:27017'
mongoose.set('strictQuery', true)
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    // useCreateIndex: true,
    // useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then((con) => {
    console.log('DB connection successfully')
  })

// console.log(app.get('env'));

const port = process.env.PORT || 5151
app.listen(port, () => {
  console.log(`App is listening on ${port} `)
})
