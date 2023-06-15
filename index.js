import express from 'express'
import bodyParser from 'body-parser'
import pokemonRouter from './routes/pokemonRoutes.js'

const app = express()

app.use(bodyParser.json())

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  )
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE')

  next()
})

app.get('/', (req, res) => {
  res.send('API is running')
})

app.use('/pokemon', pokemonRouter)

const PORT = 5000

app.listen(5000, console.log(`Server running on port ${PORT}`))
