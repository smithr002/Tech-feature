const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res, next) => res.send('Hello World!'))
app.get('/index', (req, res, next) => res.send('Home page'))
app.get('/profile', (req, res, next) => res.send('profile page'))
app.use(express.static('public'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))
