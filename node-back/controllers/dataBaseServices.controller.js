var mysql = require('mysql')
const dbConfig = require ('../config/db.config')

// DB Connection
var conexion = mysql.createConnection({
  host: dbConfig.host,
  database: dbConfig.database,
  user: dbConfig.user,
  password: dbConfig.password
})
conexion.connect((err, connection) => {
  if (err) {
    console.log('Error en la conexion' + err.stack)
    return
  }
})

// Testing
exports.test = (req,res) => {
  console.log('AQUI TENEMOS EL CONTROLLER ' + req.query.email + res)
  if (req.query == undefined){
    return res.status(400).send ({message: 'Peticion de test erronea'})
  } else {
    res.status(200).send({message:'Email no encontrado en base de datos',exist: false})
  }   
}
