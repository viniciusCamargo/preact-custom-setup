const path = require('path')
const express = require('express')
const compression = require('compression')
const app = express()

const { getPort } = require('./utils')

const drinks = [
  { name: 'Bloody Mary', drunkness: 3 },
  { name: 'Martini', drunkness: 5 },
  { name: 'Scotch', drunkness: 10 }
]
const tagline = `Any code of your own that you haven't looked at for six or more months might as well have been written by someone else.`

app.use(compression())
app.use('/static', express.static(path.resolve(__dirname, 'public')))
app.set('views', path.resolve(__dirname, 'views'))
app.set('view engine', 'ejs')

app.get('/', (req, res) => res.render('pages/index', { drinks, tagline }))
app.get('/about', (req, res) => res.render('pages/about'))

const initialState = {
  name: 'José Teobaldo da Silva'
}

app.get('/preact', (req, res) => res.render('pages/preact', {
  initialState,
  title: 'preact!'
}))

getPort(p => app.listen(p, () => console.log(`http://localhost:${p}`)))
