var express = require('express')
var app = express()
const cors = require('cors')
const bodyParser = require("body-parser")
const HTTP_PORT = 8082;
const IP = 'localhost'
app.use(cors())

app.use(bodyParser.json())

require('./routes/users.routes')(app)
require('./routes/community.routes')(app)
require('./routes/doors_floors.routes')(app)
require('./routes/bookings.routes')(app)
require('./routes/bills_spills.routes')(app)

app.listen(HTTP_PORT,IP, () => {
  console.log(`Lanzado servidor de Node.js en puerto --> ${HTTP_PORT}. En la IP: ${IP}`);
});
