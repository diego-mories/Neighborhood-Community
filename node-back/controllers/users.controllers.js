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

// Login
exports.login = (req, res) => {
    if (req.body.email != undefined && req.body.password != undefined) {
      const userLogin = {
        email : "'" + req.body.email + "'",
        password : req.body.password 
      } 
      let queryPassword = 'SELECT * FROM users WHERE email=' + userLogin.email  
      conexion.query(queryPassword, function (err, rowCount, rows) {
        if (err) {
          throw err
        } 
        else {
          if (rowCount.length === 0) { 
            res.status(200).send({message: 'El email incorrecto', OK: false})
          } 
          else { 
            let passwordQuery = rowCount[0].password
            if (bycript.compareSync(userLogin.password, passwordQuery)) {
              if (rowCount[0].is_active === 0) {
                res.status(200).send({message: 'El email y la contraseña son correctos pero es necesario activar la cuenta con el correo de bienvenida enviado', OK: false})
              } 
              else {
                res.status(200).send(
                  {
                    message: 'OK, contraseña correcta, nos logueamos', 
                    userLogin: {
                    id: rowCount[0].id,
                    name: rowCount[0].name,
                    surname: rowCount[0].surname,
                    email: rowCount[0].email,
                    phone: rowCount[0].phone,
                    password: rowCount[0].password,
                    role: rowCount[0].role,
                    tokenPass: rowCount[0].token_pass,
                    tokenActive: rowCount[0].token_active,
                    is_active: rowCount[0].is_active,
                    is_admin: rowCount[0].is_admin,
                  }, 
                  OK: true})
              }
            } 
            else {
              res.status(200).send({message: 'Contraseña incorrecta', OK: false})
            }
          }
        }
      })
    }
    else {
      return res.status(400).send({message: 'Bad request', OK: false})
    }
}

// SignUp
exports.signUp = async (req, res) => {
    if (req.body.name != undefined && req.body.surname != undefined 
      && req.body.email != undefined  && req.body.community_id != undefined ) {
      let data = req.body
      let password = random(15)
      let tokenActive = random(15)
      let user = {
        name : "'" + data.name + "'",
        surname : "'" + data.surname + "'",
        email : "'" + data.email + "'",
        phone: "'" + data.phone + "'",
        password : "'" + await bycript.hash(password,12) + "'",
        community_id : "'" + data.community_id + "'",
        token_active : "'" + tokenActive + "'",
        token_pass : "'" + random(15) + "'",
        is_active : "'" + 0 +  "'",
      }
      let queryEmail = 'SELECT * FROM users WHERE email=' + user.email
      conexion.query (queryEmail, function (err, rowCount, rows) {
        if (err) {
          throw err
        } else {
          if (rowCount.length === 0) {
            let query = 'INSERT INTO users (id, name, surname, email, phone, password, token_pass, token_active, is_active) VALUES (NULL,' + user.name + ',' + user.surname + ',' + user.email + ','  + user.phone + ','+ user.password +  ',' + user.token_pass + ',' + user.token_active + ',' + user.is_active +')'
            conexion.query(query, function (err, rowCount, rows) {
              if (err) {
                throw err
              } 
              else {
                let mailOptions = {
                  from: '"Neighborhood Community" ' +  mailConfig.auth.user,
                  to: '' + data.email,
                  subject: 'Bienvenido',
                  text: '¡Qué alegría tenerte con nosotros! ' + data.name + 
                  ', tu contraseña inicial de inicio de sesión es: ' + password + '\nnuestros servicios estarán listos para su uso una vez confirmes la activación de la cuenta a través de este enlace: http://localhost:8080/activeUser/' + tokenActive
                }
                mailTransporter.sendMail(mailOptions, function (error, info) {
                  if (error) {
                    console.log("Error email sent!", error)
                  } 
                  else {
                    console.log('Email sent: ')
                  }
                  mailTransporter.close()
                })
                return res.status(200).send({user_id: rowCount.insertId})
              }
            }) 
          } else {
            return res.status(404).send({message: 'Existe otra cuenta con este email, ya sea en esta comunidad o en otra, seleccione (Registrar vivienda a un usuario existente de esta comunidad) o (Registrar vivienda a un usuario existente de otra comunidad)'})
          }
        }
      })
    }
    else {
      return res.status(400).send({message: 'Bad request SingUp'})
    }
}

// Reset Password
exports.resetPassword = (req, res) => {
    if (req.query === undefined) {
      return res.status(400).send ({message: 'Error resetPassword'})
    } 
    else {
      let emailURL = "'" + req.query.email + "'"
      let query = 'SELECT * FROM users WHERE email=' + emailURL
      conexion.query(query, async function (err, rowCount, rows) {
        if (err) {
          throw err
        } 
        else {
          if (rowCount.length === 0) {
            res.status(200).send({message:'Email no encontrado en base de datos para recuperacion de contraseña', exist: false})
          } 
          else {
            let newPass = random(15)
            let newPassHash = "'" + await bycript.hash(newPass,12) + "'"
            let tokenPassQuery = "'" +  rowCount[0].token_pass + "'" 
            let nameUser = rowCount[0].name
            let changeQuery = 'UPDATE users SET password = REPLACE (password,' + "'" + rowCount[0].password + "'" + ',' + newPassHash + ') WHERE token_pass=' + tokenPassQuery
            conexion.query(changeQuery, function (err, rowCount, rows) {
              if (err) {
                throw err
              } 
              else {
                let mailOptions = {
                    from: '"Neighborhood Community" ' +  mailConfig.auth.user,
                    to: '' + req.query.email,
                    subject: 'Recuperación de contraseña',
                    text: '¡Hola! ' + nameUser + ', hemos generado una contraseña aleatoria para iniciar sesión, una vez acceda a su perfil puede cambiarla, la contraseña es: ' + newPass 
                    + ' \n Intente iniciar sesión con la nueva contraseña en el siguiente enlace: http://localhost:8080' 
                }
                mailTransporter.sendMail(mailOptions, function (error, info) {
                    if (error) {
                        console.log("Error email sent!", error)
                    } 
                    else {
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

// Change Password
exports.changePassword = async (req, res) => {
    let userPassword = req.body.userPass
    let tokenPass = "'" + req.body.tokenPass + "'" 
    let newPassword = req.body.password
    let newPasswordHash = "'" + await bycript.hash(newPassword,12) + "'"
    if (bycript.compareSync(newPassword, userPassword)){
      res.status(200).send({message: 'La contraseña no puede ser la actual, elige otra distinta', OK: false})
    } 
    else {
      let query = 'UPDATE users SET password = REPLACE (password,' + "'" + userPassword + "'" + ',' + newPasswordHash + ') WHERE token_pass=' + tokenPass
      conexion.query(query, function (err, rowCount, rows) {
        if (err) {
          throw err
        } 
        else {
          res.status(200).send({message: 'Hemos actualizado la contraseña en la base de datos de manera correcta', OK: true})
        }
      })
    }
}

// Find Data of one user by id
exports.findOne = (req, res) => {
    let query = 'SELECT * FROM users WHERE id=' + "'" + req.query.user_id + "'"
    conexion.query (query, function (err, rowCount, rows) {
      if (err) {
        throw err
      } else {
        res.status(200).send({rowCount}) 
      } 
    })
}

// Find Data of one user by email
exports.findOneEmail = (req, res) => {
    let query = 'SELECT * FROM users WHERE email=' + "'" + req.query.email + "'"
    conexion.query (query, function (err, rowCount, rows) {
      if (err) {
        throw err
      } else {
        res.status(200).send({rowCount}) 
      } 
    })
}

// SignUp new Doorman on community
exports.signUpDoorman = async (req, res) => {
    if (req.body.name != undefined && req.body.surname != undefined 
      && req.body.email != undefined && req.body.role_id != undefined && req.body.community_id != undefined){
      let data = req.body
      let password = random(15)
      let tokenActive = random(15)
      let user = {
        name : "'" + data.name + "'",
        surname : "'" + data.surname + "'",
        email : "'" + data.email + "'",
        password : "'" + await bycript.hash(password,12) + "'",
        role_id : "'" + data.role_id + "'",
        phone : "'" + data.phone + "'",
        community_id : "'" + data.community_id + "'",
        floor : "'" + 0 + "'",
        door : "'" + 'PORTERIA' + "'",
        token_active : "'" + tokenActive + "'",
        token_pass : "'" + random(15) + "'",
        is_active : "'" + 0 +  "'",
        first_time : "'" + 1 + "'"
      }
      let queryEmail = 'SELECT * FROM users WHERE email=' + user.email
      conexion.query (queryEmail, function (err, rowCount, rows) {
        if (err) {
          throw err
        } else {
          if (rowCount.length === 0) { 
              let query = 'INSERT INTO users (id, name, surname, email, phone, password, token_pass, token_active, is_active) VALUES (NULL,' + user.name + ',' + user.surname + ',' + user.email + ','  + user.phone + ','+ user.password +  ',' + user.token_pass + ',' + user.token_active + ',' + user.is_active +')'
              conexion.query(query, function (err, rowCount, rows) {
              if (err) {
                throw err
              } 
              else {
                let mailOptions = {
                  from: '"Neighborhood Community" ' +  mailConfig.auth.user,
                  to: '' + data.email,
                  subject: 'Bienvenido',
                  text: '¡Qué alegría tenerte con nosotros eres el nuevo portero de la comunidad! ' + data.name + 
                  ', tu contraseña inicial de inicio de sesión es: ' + password + ' \nnuestros servicios estarán listos para su uso una vez confirmes la activación de la cuenta a través de este enlace: http://localhost:8080/activeUser/' + tokenActive
                }
                mailTransporter.sendMail(mailOptions, function (error, info) {
                  if (error) {
                    console.log("Error email sent!", error)
                  } 
                  else {
                    console.log('Email sent: ')
                  }
                  mailTransporter.close()
                })
                let is_available = "'" + 0 + "'"
                let query3 = 'INSERT INTO doors_floors (id, community_id, user_id, role_id, floor, door,  is_available) VALUES (NULL,' + user.community_id + ',' + rowCount.insertId + ',' + user.role_id + ',' + user.floor + ',' + user.door + ',' + is_available + ')'  
                conexion.query(query3, function (err, rowCount, rows) {
                  if (err) {
                    throw err
                  } 
                  else {
                    let doorman_active = "'" + 1 + "'"
                    let query2 = 'UPDATE community SET doorman_active=' + doorman_active + 'WHERE id=' + user.community_id
                    conexion.query(query2, function (err, rowCount, rows) {
                      if (err) {
                        throw err
                      } 
                      else {
                        res.status(200).send({message:'Portero registrado en comunidad de manera correcta'})   
                      }
                    })
                  }
                })
              }
            })
          } 
          else {
            res.status(404).send({message:'El email ya está registrado en la plataforma, por favor cambie de formulario para dar de alta al portero'})
          }
        }
      })
    }
}
// Active user
exports.activeUser = (req, res) => {
    if (req.query == undefined){
      return res.status(400).send ({message: 'Peticion de activeUser erronea'})
    } 
    else {
      let token_active = "'" + req.query.tokenActive + "'"
      let is_active = "'" + 0 + "'"
      let new_is_active = "'" + 1 + "'"
      let query = 'SELECT * FROM users WHERE token_active=' + token_active + 'AND is_active=' + is_active
      conexion.query(query, function (err, rowCount, rows) {
        if (err) {
          throw err
        } 
        else {
          if (rowCount.length === 0) {
            res.status(200).send({message:'Cuenta ya activa, puede iniciar sesión', active: true})
          } 
          else {
            let newQuery = 'UPDATE users SET is_active=' + new_is_active + 'WHERE token_active=' + token_active + 'AND is_active=' + is_active 
            conexion.query(newQuery, function (err, rowCount, rows) {
              if (err) {
                throw err
              } 
              else {
                res.status(200).send({message:'Activación realizada de manera correcta!! Puede iniciar sesión en la plataforma', active: false})   
              }
            })
          }
        }
      })
    }
}
  