var express = require('express')
var app = express()
const cors = require('cors')
const bodyParser = require("body-parser")
const HTTP_PORT = 8082;

app.use(cors())

app.use(bodyParser.json())

require('./routes/database.routes')(app)
require('./routes/users.routes')(app)
require('./routes/community.routes')(app)
require('./routes/doors_floors.routes')(app)

app.listen(HTTP_PORT,'127.0.0.1', () => {
  console.log(`Lanzado servidor de Node.js en puerto --> ${HTTP_PORT}.`);
});