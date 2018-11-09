const express = require('express')
const bodyParser = require('body-parser')
const massive = require('massive')
require('dotenv').config()

const c = require('./controller')

const app = express()
app.use(bodyParser.json())
const {APP_PORT, CONNECTION_STRING} = process.env

massive(CONNECTION_STRING).then(db => {
    console.log('db baby!')
    app.set('db',db)
}).catch(err => {
    console.error('Its not working......db', err)
})

app.get('/api/homes/', c.getAllHouses)
app.post('/api/homes/', c.addNewHouse)
app.delete('/api/homes/:id', c.deleteHouse)

app.listen(APP_PORT, () => {
    console.log('"Its working!"', APP_PORT);
})
