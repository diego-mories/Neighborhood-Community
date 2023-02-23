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

// Testing y modelo de estructura de datos
exports.test = (req,res) => {
  if (req.query == undefined) {
    return res.status(400).send ({message: 'Peticion de test erronea'})
  } else {
    // Buscamos un email en la tabla users de la base de datos para ver que nos conectamos bien y hacemos un test de conexion con esto
    let emailURL = "'" + req.query.email + "'"
    let query = 'SELECT * FROM users WHERE email=' + emailURL
    conexion.query (query, 
      function (err, rowCount, rows) {
        if (err) {
          throw err
        } else {
          if (rowCount.length === 0) {
            res.status(200).send({message:'Email no encontrado en base de datos',exist: false})
          } else {
            res.status(200).send({message:'Email encontrado', exist: true})
          }
        }
      }
    )
  }   
}

// User login with response data to front 
exports.login = (req, res) => {
  if (req.query == undefined) {
    return res.status(400).send ({message: 'Login error --> No llegan los datos de la consulta de forma correcta'})
  }
  else {
    let emailURL = "'" + req.query.email + "'"
    let password = "'" + req.query.email + "'"
    let queryPassword = 'SELECT * FROM users WHERE email=' + email
    conexion.query(queryPassword, function (err, rowCount, rows) {
      if (err) {
        throw err
      } else {
        let passwordQuery = rowCount[0].password
        // Continuar comparando la clave de la consulta con la clave pasada por la url para poder inciar sesion
      }
    })
  }
}