var mysql = require('mysql')
const random = require('string-random')
const bycript = require('bcrypt')
const dbConfig = require ('../config/db.config')
const { user } = require('../config/db.config')

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

exports.signUp = async (req, res) => {
  if (req.body.name != undefined && req.body.surname != undefined 
    && req.body.email != undefined && req.body.password != undefined 
    && req.body.role != undefined && req.body.community_id != undefined 
    && req.body.floor != undefined && req.body.door != undefined){
    let data = req.body
    let user = {
      name : "'" + data.name + "'",
      surname : "'" + data.surname + "'",
      email : "'" + data.email + "'",
      password : "'" + await bycript.hash(data.password,12) + "'",
      role : "'" + data.role + "'",
      community_id : "'" + data.community_id + "'",
      floor : "'" + data.flor + "'",
      door : "'" + data.door + "'",
      token_pass : "'" + random(15) + "'",
      token_active : "'" + random(15) + "'",
      is_active : "'" + "'"
    }
    let queryEmail = 'SELECT * FROM users WHERE email=' + user.email
    // Tenemos que buscar que el email no exista ya en la base de datos
    conexion.query (queryEmail, 
    function (err, rowCount, rows) {
      if (err) {
        throw err
      } else {
        if (rowCount.length === 0) { // Email no existe, registramos en la base de datos
          let query = 'INSERT INTO users (id, name, surname, email, password, role, community_id, floor, door, token_pass, token_active, is_active) VALUES (NULL,' + user.name + ',' + user.surname + ',' + user.email + ',' + user.password + ',' + user.role + ',' + user.community_id + ',' + user.floor + ',' + user.door + ',' + user.token_pass + ',' + user.token_active + ',' + user.is_active + ')'
          conexion.query(query, function (err, rowCount, rows) {
            if (err) {
              throw err
            } else {
              res.status(200).send({message:'Email no encontrado en base de datos, REGISTRO OK'})            }
          })
        } else {
          res.status(404).send({message:'Email encontrado no se puede hacer el registro'})
        }
      }
    }
  )
  }
  else {
    return res.status(400).send({message: 'Bad request'})
  }
}



// User login with response data to front 
exports.signIn = (req, res) => {
  if (req.body.email != undefined && req.body.password != undefined){
    const userLogin = {
      email : "'" + req.body.email + "'",
      password : req.body.password 
    } 
    // console.log('email: ' + userLogin.email + 'passwd: ' + userLogin.password)
    let queryPassword = 'SELECT * FROM users WHERE email=' + userLogin.email  
    conexion.query(queryPassword, function (err, rowCount, rows) {
      if (err) {
        throw err
      } else {
        if (rowCount.length === 0) { // El email no existe en la base de datos
          return res.status(200).send({message: 'El email no existe en la base de datos', OK: false})
        } else { // El email existe en la base de datos, comprobamos contraseñas 
          let passwordQuery = rowCount[0].password
          console.log(rowCount[0])
          if (bycript.compareSync(userLogin.password, passwordQuery)){
            // console.log('La contraseña es correcta, coincide con el desencriptado')
            return res.status(200).send(
            {message: 'OK, contraseña correcta, nos logueamos', 
            userLogin: {
              id: rowCount[0].id,
              name: rowCount[0].name,
              surname: rowCount[0].surname,
              email: rowCount[0].email,
              password: rowCount[0].password,
              role: rowCount[0].role,
              community_id: rowCount[0].community_id,
              floor: rowCount[0].floor,
              door: rowCount[0].door,
              tokenPass: rowCount[0].tokenPass,
              tokenActive: rowCount[0].tokenActive,
              is_active: rowCount[0].is_active
            }, 
            OK: true})
          } else {
            return res.status(200).send({message: 'La contraseña no coincide', OK: false})
           }
        }
       }
     })
  }
  else {
    return res.status(400).send({message: 'Bad request', OK: false})
  }
}
