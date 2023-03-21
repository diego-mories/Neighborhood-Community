var mysql = require('mysql')
const nodemailer = require('nodemailer')
const random = require('string-random')
const bycript = require('bcrypt')
const dbConfig = require ('../config/db.config')
const mailConfig = require ('../config/mail.config')

// MAIL Config
var mailTransporter = nodemailer.createTransport({
  host: mailConfig.host,
  service: mailConfig.service,
  auth: {
    user: mailConfig.auth.user,
    pass: mailConfig.auth.pass
  }
})
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
    let tokenActive = random(15)
    let user = {
      name : "'" + data.name + "'",
      surname : "'" + data.surname + "'",
      email : "'" + data.email + "'",
      password : "'" + await bycript.hash(data.password,12) + "'",
      role : "'" + data.role + "'",
      community_id : "'" + data.community_id + "'",
      floor : "'" + data.floor + "'",
      door : "'" + data.door + "'",
      token_active : "'" + tokenActive + "'",
      token_pass : "'" + random(15) + "'",
      is_active : "'" + 0 +  "'",
      first_time : "'" + 0 + "'"
    }
    let queryEmail = 'SELECT * FROM users WHERE email=' + user.email
    // Tenemos que buscar que el email no exista ya en la base de datos
    conexion.query (queryEmail, 
    function (err, rowCount, rows) {
      if (err) {
        throw err
      } else {
        if (rowCount.length === 0) { // Email no existe, registramos en la base de datos
          let query = 'INSERT INTO users (id, name, surname, email, password, role, community_id, floor, door, token_pass, token_active, is_active, first_time) VALUES (NULL,' + user.name + ',' + user.surname + ',' + user.email + ',' + user.password + ',' + user.role + ',' + user.community_id + ',' + user.floor + ',' + user.door + ',' + user.token_pass + ',' + user.token_active + ',' + user.is_active + ',' + user.first_time + ')'
          conexion.query(query, function (err, rowCount, rows) {
            if (err) {
              throw err
            } else {
              let mailOptions = {
                from: '"Neighborhood Community" ' +  mailConfig.auth.user,
                to: '' + data.email,
                subject: 'Bienvenido',
                text: '¡Qué alegría tenerte con nosotros! ' + data.name + 
                ', nuestros servicios estarán listos para su uso una vez confirmes la activación de la cuenta a través de este enlace: http://localhost:8080/activeUser/' + tokenActive
              }
              mailTransporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                  console.log("Error email sent!", error)
                } else {
                  console.log('Email sent: ')
                }
                mailTransporter.close()
              })
              res.status(200).send({message:'Email no encontrado en base de datos, REGISTRO OK'})}
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
          return res.status(200).send({message: 'El email incorrecto', OK: false})
        } else { // El email existe en la base de datos, comprobamos contraseñas 
          let passwordQuery = rowCount[0].password
          // console.log(rowCount[0])
          if (bycript.compareSync(userLogin.password, passwordQuery)){
            // console.log('La contraseña es correcta, coincide con el desencriptado')
            if (rowCount[0].is_active === 0){
             return res.status(200).send({message: 'El email y la contraseña son correctos pero es necesario activar la cuenta con el correo de bienvenida enviado', OK: false})
            } else {
              console.log()
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
                  tokenPass: rowCount[0].token_pass,
                  tokenActive: rowCount[0].token_active,
                  is_active: rowCount[0].is_active
                }, 
                OK: true})
            }
          } else {
            return res.status(200).send({message: 'Contraseña incorrecta', OK: false})
           }
        }
       }
     })
  }
  else {
    return res.status(400).send({message: 'Bad request', OK: false})
  }
}

// Active user
exports.activeUser = (req, res) => {
  if(req.query == undefined){
    return res.status(400).send ({message: 'Peticion de emailExist erronea'})
  } else {
    let token_active = "'" + req.query.tokenActive + "'"
    let is_active = "'" + 0 + "'"
    let new_is_active = "'" + 1 + "'"
    let query = 'SELECT * FROM users WHERE token_active=' + token_active + 'AND is_active=' + is_active
    conexion.query(query, function (err, rowCount, rows) {
      if (err) {
        throw err
      } else {
        if (rowCount.length === 0) {
          res.status(200).send({message:'Cuenta ya activa, puede iniciar sesión', active: true})
        } else {
          let newQuery = 'UPDATE users SET is_active=' + new_is_active + 'WHERE token_active=' + token_active + 'AND is_active=' + is_active 
          conexion.query(newQuery, function (err, rowCount, rows) {
            if (err) {
              throw err
            } else {
              res.status(200).send({message:'Activación realizada de manera correcta!! Puede iniciar sesión en la plataforma', active: false})   
            }
          })
        }
      }
    })
  }
}

// Reset Password
exports.resetPassword = (req, res) => {
  if (req.query === undefined){
    return res.status(400).send ({message: 'Error resetPassword'})
  } else {
    let emailURL = "'" + req.query.email + "'"
    let query = 'SELECT * FROM users WHERE email=' + emailURL
    conexion.query(query, async function (err, rowCount, rows) {
      if (err) {
        throw err
      } else {
        if (rowCount.length === 0) {
          res.status(200).send({message:'Email no encontrado en base de datos para recuperacion de contraseña', exist: false})
        } else {
          let newPass = random(15)
          let newPassHash = "'" + await bycript.hash(newPass,12) + "'"
          let tokenPassQuery = "'" +  rowCount[0].token_pass + "'" 
          let nameUser = rowCount[0].name
          let changeQuery = 'UPDATE users SET password = REPLACE (password,' + "'" + rowCount[0].password + "'" + ',' + newPassHash + ') WHERE token_pass=' + tokenPassQuery
          conexion.query(changeQuery, function (err, rowCount, rows) {
            if (err) {
              throw err
            } else {
              let mailOptions = {
                  from: '"Neighborhood Community" ' +  mailConfig.auth.user,
                  to: '' + req.query.email,
                  subject: 'Recuperación de contraseña',
                  text: '¡Hola! ' + nameUser + ', hemos generado una contraseña aleatoria para iniciar sesión, una vez acceda a su perfil puede cambiarla, la contraseña es: ' + newPass 
                  + '. Intente iniciar sesión con la nueva contraseña en el siguiente enlace: http://localhost:8080' 
                }
                mailTransporter.sendMail(mailOptions, function (error, info) {
                  if (error) {
                    console.log("Error email sent!", error)
                  } else {
                    console.log('Email sent: ')
                  }
                  mailTransporter.close()
                })
              res.status(200).send({message: 'Hemos actualizado la contraseña de manera correcta, revise su bandeja del correo electronico: ' + req.query.email})
            }
          })
        }
      }
    })
  }
}

exports.changePassword = async (req, res) => {
  let userPassword = req.body.userPass
  let tokenPass = "'" + req.body.tokenPass + "'" 
  let newPassword = req.body.password
  let newPasswordHash = "'" + await bycript.hash(newPassword,12) + "'"
  if (bycript.compareSync(newPassword, userPassword)){
    res.status(200).send({message: 'La contraseña no puede ser la actual, elige otra distinta', OK: false})
  } else {
    let query = 'UPDATE users SET password = REPLACE (password,' + "'" + userPassword + "'" + ',' + newPasswordHash + ') WHERE token_pass=' + tokenPass
    conexion.query(query, function (err, rowCount, rows) {
      if (err) {
        throw err
      } else {
        console.log('Antigua contraseña: ' + userPassword +' encriptada nueva: ' + newPasswordHash)
        console.log('Nueva contraseña: ' + newPassword +' encriptada: ' + newPasswordHash)
        res.status(200).send({message: 'Hemos actualizado la contraseña en la base de datos de manera correcta', OK: true})
      }
    })
  }
}
exports.newCommunity = async (req, res) => {
  if (req.body.email != undefined && req.body.name != undefined){
    const community = {
      email : "'" + req.body.email + "'",
      nameC : "'" + req.body.nameC + "'",
      name : "'" + req.body.name + "'",
      surname : "'" + req.body.surname + "'",
    } 
    let password = random(15)
    let tokenActive = random(15)
    let user = {
      name : community.name,
      surname : community.surname,
      email : community.email,
      password : "'" + await bycript.hash(password,12) + "'",
      role : "'" + 1 + "'",
      community_id : "'" + 0 + "'",
      floor : "'" + 0 + "'",
      door : "'" + 0 + "'",
      token_active : "'" + tokenActive + "'",
      token_pass : "'" + random(15) + "'",
      is_active : "'" + 0 + "'",
      first_time : "'" + 1 + "'"
    }
    // Buscamos el email por si existe en la base de datos, si no existe, registramos
    let query = 'SELECT * FROM users WHERE email=' + user.email
    conexion.query(query, function (err, rowCount, rows) {
      if (err) {
        throw err
      } else {
        if (rowCount.length === 0) { // Email no existe, buscamos nombre de la comunidad
          // Buscamos si el nombre de la comunidad existe
          let query2 = 'SELECT * FROM community WHERE name=' + community.nameC
          conexion.query(query2, function (err, rowCount, rows) { 
              if (err) {
                throw err
              } else {
                  if (rowCount.length === 0) { // Podemos hacer el registro correcto, no hay ninguna comunidad con ese nombre ni con ese email del preisdente
                    let query3 = 'INSERT INTO users (id, name, surname, email, password, role, community_id, floor, door, token_pass, token_active, is_active, first_time) VALUES (NULL,' + user.name + ',' + user.surname + ',' + user.email + ',' + user.password + ',' + user.role + ',' + user.community_id + ',' + user.floor + ',' + user.door + ',' + user.token_pass + ',' + user.token_active + ',' + user.is_active +  ',' + user.first_time + ')'
                    conexion.query(query3, function (err, rowCount, rows) {
                      if (err) {
                        throw err
                      } else {
                        let mailOptions = {
                          from: '"Neighborhood Community" ' +  mailConfig.auth.user,
                          to: '' + req.body.email,
                          subject: 'Bienvenido',
                          text: '¡Qué alegría tenerte con nosotros! ' + user.name + 
                          ' una vez actives tu cuenta, e inicie sesión con tu contraseña: ' + password + '. Podrás configurar tu comunidad a tu gusto la primera vez que inicies sesión, espero que disfrutes de los servicios aportados!!' + 
                          ', nuestros servicios estarán listos para su uso una vez confirmes la activación de la cuenta a través de este enlace: http://localhost:8080/activeUser/' + tokenActive
                        }
                        mailTransporter.sendMail(mailOptions, function (error, info) {
                          if (error) {
                            console.log("Error email sent!", error)
                          } else {
                            console.log('Email sent: ')
                          }
                          mailTransporter.close()
                        })
                        // Registramos la nueva comunidad en la base de datos
                        let query4 = 'INSERT INTO community (id, name) VALUES (NULL,' + community.nameC + ')'
                        conexion.query(query4, function (err, rowCount, rows) {
                          if (err) {
                            throw err
                          } else {
                            // Obtenemos el id generado para esta comunidad y se lo actualizaremos al presidente 
                            let query5 = 'SELECT * FROM community WHERE name=' + community.nameC
                            conexion.query(query5, function (err, rowCount, rows) {
                              if (err) {
                                throw err
                              } else {
                                if (rowCount.length !== 0) {
                                  // Encontramos la comunidad con ese nombre en la base de datos, obtenemos el id y lo actualizamos en la base de datos del usuario presidente
                                  // console.log(rowCount[0])
                                  let newId =  "'" +  rowCount[0].id + "'"
                                  let query6 = 'UPDATE users SET community_id=' + newId + 'WHERE token_active=' + user.token_active
                                  conexion.query(query6, function (err, rowCount, rows) {
                                    if (err) {
                                      throw err
                                    } else {
                                      res.status(200).send({message:'Actualizamos el id de comunidad del presidente y el registro de la nueva comunidad ha funcionado correctamente', OK: true})
                                    }              
                                  })
                                } else {
                                  res.status(200).send({message:'Error al actualizar el id de la comunidad del presidente, no encontramos comunidad con ese nombre', OK: false})
                                }
                              }              
                            })
                          }              
                        })
                      }
                    })
                  } else {
                    res.status(200).send({message:'Email no encontrado en base de datos, REGISTRO Fallido, nombre de la comunidad ya existe elija otro distinto', OK: false})
                  }
              }
          })
        } else {
          res.status(200).send({message:'Email encontrado, existe una persona con el email ya registrada anteriormente, elija otro distinto', OK: false})
        }
      }
    })
  } else {
    return res.status(400).send ({message: 'Error newCommunity en datos del body'})
  }
}