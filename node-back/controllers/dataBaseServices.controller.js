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

exports.searchCommunity = (req, res) => {
  let user_id = "'" + req.query.user_id + "'"
  let query = 'SELECT * FROM doors_floors WHERE user_id=' + user_id
  console.log(query)
  conexion.query(query, function (err, rowCount, rows) {
    if (err) {
      throw err
    } 
    else {
      if (rowCount.length >= 0) {
        res.status(200).send({rowCount})
      }
    }
  })
}
exports.searchNameCommunity = (req, res) => {
  let community_id = "'" + req.query.community_id + "'"
  let query = 'SELECT * FROM community WHERE id=' + community_id
  conexion.query(query, function (err, rowCount, rows) {
    if (err) {
      throw err
    } 
    else {
      if (rowCount.length >= 0) {
        res.status(200).send({rowCount})
      }
    }
  })
}
exports.searchDF = (req, res) => {
  let user_id = "'" + req.query.user_id + "'"
  let query = 'SELECT * FROM doors_floors WHERE user_id=' + user_id
  conexion.query(query, function (err, rowCount, rows) {
    if (err) {
      throw err
    } 
    else {
      if (rowCount.length > 0) {
        res.status(200).send({rowCount, floors_doors: rowCount})
      }
    }
  })
}

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
                {message: 'OK, contraseña correcta, nos logueamos', 
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

exports.newCommunity = async (req, res) => {
  const community = {
    nameC : "'" + req.body.nameC + "'",
    paddle: "'" + req.body.paddle + "'" , 
    tennis: "'" + req.body.tennis + "'" ,
    pool: "'" + req.body.pool + "'" ,
    doorman: "'" + req.body.doorman + "'" ,
    cameras: "'" + req.body.cameras + "'" , 
    myDoor: "'" + req.body.myDoor + "'" ,
    myFloor: "'" + req.body.myFloor + "'" , 
    floors: "'" + req.body.floors + "'" , 
    doors: "'" + req.body.doors + "'"  
  } 
  let password = random(15)
  let tokenActive = random(15)
  let user = {
    name : "'" + req.body.name + "'",
    surname : "'" + req.body.surname + "'",
    email : "'" + req.body.email + "'",
    phone : "'" + '+34 ' + req.body.phone + "'",
    password : "'" + await bycript.hash(password,12) + "'",
    role : "'" + 1 + "'",
    token_active : "'" + tokenActive + "'",
    token_pass : "'" + random(15) + "'",
    is_active : "'" + 0 + "'",
    
  }
  // Buscamos si el nombre de la comunidad existe
  let query = 'SELECT * FROM community WHERE name=' + community.nameC
  conexion.query(query, function (err, rowCount, rows) { 
    if (err) {
      throw err
    } 
    else {
      if (rowCount.length === 0){
        let query2 = 'INSERT INTO community (id, name, has_paddle_court, has_tennis_court, has_pool, has_cameras, has_building_doorman, floors, doors) VALUES (NULL,' + community.nameC + ','+ community.paddle + ',' +  community.tennis + ',' +  community.pool + ',' +  community.cameras + ',' +  community.doorman + ',' +  community.floors + ',' +  community.doors + ')'
        conexion.query(query2, function (err, rowCount, rows) {
          if (err) {
            throw err
          }  
          else {
            res.status(200).send({community_id:rowCount.insertId})   
          }
        })
      } else {
        console.log('Error al crear una comunidad con el mismo nombre ')
      }
      
    }
  })
} 

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
    // Tenemos que buscar que el email no exista ya en la base de datos
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
                ', tu contraseña inicial de inicio de sesión es: ' + password + ' nuestros servicios estarán listos para su uso una vez confirmes la activación de la cuenta a través de este enlace: http://localhost:8080/activeUser/' + tokenActive
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

exports.insertRowsFD = (req,res) => {
  if (req.body.community_id != undefined && req.body.floor != undefined && req.body.door != undefined){
    // Añadimos la fila a la tabla doors and floors
    let data = {
      community_id: "'" + req.body.community_id + "'" ,
      floor: "'" + req.body.floor + "'" ,
      door: "'" + req.body.door + "'"
    }
    let query = 'INSERT INTO doors_floors (id, community_id, floor, door) VALUES (NULL,' + data.community_id + ',' + data.floor + ',' + data.door + ')'  
    conexion.query(query, function (err, rowCount, rows) {
      if (err) {
        throw err
      } 
      else {
        res.status(200).send({message:'Filas de tabla doors and floors añadidas correctamente'})   
      }
    })
  } 
  else {
    return res.status(400).send ({message: 'Error insertRowsFD en datos del body'})
  }
}

exports.updateFDDoorman = (req,res) => {
  // Añadimos la fila a la tabla doors and floors
  let data = {
    user_id: "'" + req.body.user_id + "'" ,
    myFloor: "'" + 0 + "'" ,
    myDoor: "'" + 'PORTERIA' + "'",
    role_id: "'" + req.body.role_id + "'",
    community_id: "'" + req.body.community_id + "'",
    is_available: "'" + 0 + "'",
  }
  let query = 'INSERT INTO doors_floors (community_id,user_id, role_id, floor, door, is_available) VALUES (' + data.community_id + ',' + data.user_id + ',' + data.role_id + ',' + data.myFloor + ',' + data.myDoor + ',' + data.is_available + ')'  
  conexion.query(query, function (err, rowCount, rows) {
    if (err) {
      throw err
    } 
    else {
      let doorman_active = "'" + 1 + "'"
      let query2 = 'UPDATE community SET doorman_active=' + doorman_active + 'WHERE id=' + data.community_id
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
exports.uptadeFD = (req,res) => {
    // Añadimos la fila a la tabla doors and floors
    let data = {
      id: "'" + req.body.id + "'" ,
      myFloor: "'" + req.body.myFloor + "'" ,
      myDoor: "'" + req.body.myDoor + "'",
      role_id: "'" + req.body.role_id + "'",
      community_id: "'" + req.body.community_id + "'",
      is_available: "'" + 0 + "'",
    }
    let query = 'UPDATE doors_floors SET user_id=' + data.id + ',' + 'is_available=' +  data.is_available + ',role_id=' + data.role_id + 'WHERE floor=' + data.myFloor + 'AND door=' + data.myDoor + 'AND community_id=' + data.community_id
    console.log(query)
    conexion.query(query, function (err, rowCount, rows) {
      if (err) {
        throw err
      } 
      else {
        res.status(200).send({message:'Id del presidente en doors y floors actualizado'})   
      }
    })
} 
exports.searchOwnersDF = (req, res) => {
  let community_id = "'" + req.query.community_id + "'"
  let is_available = "'" + 0 + "'"
  let query = 'SELECT * FROM doors_floors WHERE community_id=' + community_id + 'AND is_available= ' + is_available
  conexion.query (query, function (err, rowCount, rows) {
    if (err) {
      throw err
    } else {
      res.status(200).send({rowCount}) 
    } 
  })
}
exports.sendNotice = (req, res) => {
  console.log(req.body.user_id)
  let data = {
    user_id: "'" + req.body.user_id + "'",
    date: "'" + req.body.date + "'",
    hour: "'" + req.body.hour + "'",
    orderDay: "'" + req.body.orderDay + "'",
  }
  let query = 'SELECT * FROM users WHERE id=' + data.user_id
  conexion.query (query, function (err, rowCount, rows) {
    if (err) {
      throw err
    } else {
      let email = rowCount[0].email
      let mailOptions = {
        from: '"Neighborhood Community" ' +  mailConfig.auth.user,
        to: '' + email,
        subject: 'JUNTA DE VECINOS: ' + req.body.date,
        text:  'Muy Sr. mío: \n De conformidad con lo dispuesto en la Ley de Propiedad Horizontal, me permito convocarle a la Junta General Ordinaria de esta comunidad, que tendrá lugar el próximo día ' + req.body.date + ', a las: ' + req.body.hour + ' cuya orden del dia es: ' + req.body.orderDay + ', esperamos su asistencia \n Un saludo '     
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

}

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
exports.findOneEmail = (req, res) => {
  let query = 'SELECT * FROM users WHERE email=' + "'" + req.query.email + "'"
  console.log(query)
  conexion.query (query, function (err, rowCount, rows) {
    if (err) {
      throw err
    } else {
      console.log(rowCount)
      res.status(200).send({rowCount}) 
    } 
  })
}
 exports.searchDFExist = (req,res) => {
  console.log(req.query)
  let data = {
    user_id: "'" + req.query.user_id + "'",
    community_id: "'" + req.query.community_id + "'",
  }
  let query = 'SELECT * FROM doors_floors WHERE user_id=' + data.user_id + 'AND community_id=' + data.community_id
  console.log(query)
  conexion.query (query, function (err, rowCount, rows) {
    if (err) {
      throw err
    } else {
      res.status(200).send({rowCount}) 
    } 
  })
 }

exports.signUpDoorman = async (req, res) => {
  if (req.body.name != undefined && req.body.surname != undefined 
    && req.body.email != undefined && req.body.role_id != undefined && req.body.community_id != undefined){
    let data = req.body
    let password = random(15)
    let tokenActive = random(15)
    console.log(data)
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
    // Tenemos que buscar que el email no exista ya en la base de datos
    conexion.query (queryEmail, function (err, rowCount, rows) {
      if (err) {
        throw err
      } else {
        if (rowCount.length === 0) { // Email no existe, registramos en la base de datos
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
                ', tu contraseña inicial de inicio de sesión es: ' + password + ' nuestros servicios estarán listos para su uso una vez confirmes la activación de la cuenta a través de este enlace: http://localhost:8080/activeUser/' + tokenActive
              }
              mailTransporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                  console.log("Error email sent!", error)
                } 
                else {
                  // console.log('Email sent: ')
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
    }
  )
  }
}
// Active user
exports.activeUser = (req, res) => {
  if (req.query == undefined){
    return res.status(400).send ({message: 'Peticion de emailExist erronea'})
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

// Reset Password
exports.resetPassword = (req, res) => {
  if (req.query === undefined){
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
                  + ' . Intente iniciar sesión con la nueva contraseña en el siguiente enlace: http://localhost:8080' 
                }
                mailTransporter.sendMail(mailOptions, function (error, info) {
                  if (error) {
                    console.log("Error email sent!", error)
                  } 
                  else {
                    //console.log('Email sent: ')
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
     
exports.confCommunity = (req, res) => {
//   if (req.body.id != undefined && req.body.community_id != undefined &&
//     req.body.paddle != undefined && req.body.tennis!= undefined &&
//     req.body.pool != undefined && req.body.doorman != undefined &&
//     req.body.cameras != undefined && req.body.myDoor != undefined &&
//     req.body.myFloor != undefined && req.body.floors != undefined &&
//     req.body.doors != undefined){
//       let data = {
//         id: "'" + req.body.id + "'" ,
//         community_id: "'" + req.body.community_id + "'" ,
//         paddle: "'" + req.body.paddle + "'" , 
//         tennis: "'" + req.body.tennis + "'" ,
//         pool: "'" + req.body.pool + "'" ,
//         doorman: "'" + req.body.doorman + "'" ,
//         cameras: "'" + req.body.cameras + "'" , 
//         myDoor: "'" + req.body.myDoor + "'" ,
//         myFloor: "'" + req.body.myFloor + "'" , 
//         floors: "'" + req.body.floors + "'" , 
//         doors: "'" + req.body.doors + "'"  
//       }
//       let newFirtsTime =  "'" + 0 + "'"
//       // Si todos los datos estan bien, los metemos en la tabla de la comunidad
//       let query = 'UPDATE community SET has_paddle_court=' + data.paddle + ',has_tennis_court=' +  data.tennis + ',has_pool=' +  data.pool + ',has_cameras=' +  data.cameras + ',has_building_doorman=' +  data.doorman + ',floors=' +  data.floors + ',doors=' +  data.doors + 'WHERE id=' + data.community_id
//       conexion.query(query, function (err, rowCount, rows) {
//         if (err) {
//           throw err
//         } 
//         else {
//           // Actualizamos primera vez en el presidente para no tener que configurar mas veces la comunidad y su planta y puerta
//           let query2 = 'UPDATE users SET first_time=' + newFirtsTime + ',door=' +  data.myDoor + ',floor=' +  data.myFloor + 'WHERE id=' + data.id
//           conexion.query(query2, function (err, rowCount, rows) {
//             if (err) {
//               throw err
//             } 
//             else {
//               res.status(200).send({message:'Datos de comunidad añadidos, y datos actualizados del presidente de la comunidad'})   
//             }
//           })
//           // res.status(200).send({message:'Actualizacion de first_time OK'})   
//         }
//       })
//   } 
//   else {
//     return res.status(400).send ({message: 'Error confCommunity en datos del body'})
//   }
}

exports.searchDBCommunities = (req, res) =>{
  let query = 'SELECT * FROM community'
  conexion.query(query, function (err, rowCount, rows) {
    if (err) {
      throw err
    } 
    else {
      res.status(200).send({message:'Obtenemos datos de comunidades', communities: rowCount})   
    }
  })
}
exports.searchMyCommunity = (req, res) =>{
  let community_id = "'" + req.query.community_id + "'"
  let is_available = "'" + 1 + "'"
  let query = 'SELECT * FROM doors_floors WHERE community_id=' + community_id + 'AND is_available=' + is_available
  conexion.query(query, function (err, rowCount, rows) {
    if (err) {
      throw err
    } 
    else {
      res.status(200).send({message:'Obtenemos datos de puertas y plantas disponibles en las comunidades', floors_doors: rowCount})   
    }
  })
}
exports.searchDoorman = (req, res) =>{
  let community_id = "'" + req.query.community_id + "'"
  let doorman_active = "'" + 0 + "'"
  let has_doorman = "'" + 1 + "'"
  let query = 'SELECT * FROM community WHERE id=' + community_id + 'AND doorman_active=' + doorman_active + 'AND has_building_doorman=' + has_doorman
  conexion.query(query, function (err, rowCount, rows) {
    if (err) {
      throw err
    } 
    else {
      if (rowCount.length === 0) {
        res.status(200).send({message:'No tenemos portero o el portero está activo en la comunidad', exist: false})
      } else {
        res.status(200).send({message:'Tenemos portero y no esta activo aun en la comunidad', exist: true})
      }
    }
  })
}

exports.createBill = (req, res) => {
  console.log(req.body)
  // Insertamos la fila en la tabla bills
  var data = {
    community_id: "'" + req.body.community_id + "'" ,
    date_p: "'" + req.body.date_p + "'" ,
    amount: "'" + req.body.amount + "'",
    type_id:"'" + req.body.type + "'"
  }
  let query = 'INSERT INTO bills (id, community_id,date_p,type_id,amount) VALUES (NULL,' + data.community_id + ',' + data.date_p + ',' + data.type_id + ',' + data.amount + ')'  
  console.log(query)
  conexion.query(query, function (err, rowCount, rows) {
    if (err) {
      throw err
    } 
    else {
     // console.log('Cuenta añadida correctamente')
     // Buscamos cuantas personas estan en la comunidad 
     let string = 'PORTERIA'
     let is_available = "'" + 0 + "'"
     let porteria = "'" + string + "'"

     let query2 = 'SELECT * FROM doors_floors WHERE community_id=' + data.community_id + 'AND is_available= ' + is_available + 'AND door<>' + porteria
     conexion.query(query2, function (err, rowCount, rows) {
      if (err) {
        throw err
      } 
      else {
        let numPersonas = rowCount.length
        let amountPersona = req.body.amount / numPersonas
          for (let persona of rowCount) {
          // console.log('Añadimos la fila con el gasto de la persona con id floors: ' + persona.id + ' la cantidad de: ' + amountPersona + ' con puerta: ' + persona.door + ' y piso: ' + persona.floor) 
            let type
            if (req.body.type === '1') type = 1
            if (req.body.type === '2') type = 2
            if (req.body.type === '3') type = 3
            let dataquery = {
            doors_floors_id: "'" + persona.id + "'" ,
            type_bill: "'" + type + "'" ,
            is_spill:"'" +  0 + "'" ,
            amount:"'" + amountPersona + "'" 
            }
            let query3 = 'INSERT INTO debs (id, door_floors_id,date_p,type_bill,is_spill,amount) VALUES (NULL,' + dataquery.doors_floors_id + ',' + data.date_p + ','+ dataquery.type_bill + ',' + dataquery.is_spill + ',' + dataquery.amount +')'  
            conexion.query(query3, function (err, rowCount, rows) {
            if (err) {
              throw err
            } else {
              let query4 = 'INSERT INTO payments (id, deb_id,type_bill,is_spill,amount,d_deb) VALUES (NULL,' + "'" + rowCount.insertId + "'" + ',' + dataquery.type_bill + ',' + dataquery.is_spill + ',' + "'" + 0 + "'" +  ',' + data.date_p + ')'
              conexion.query(query4, function (err, rowCount, rows) {
                if (err) {
                  throw err
                } else {
                  console.log('Cuentas, pagos y deudas añadidas correctamente')                  
                } 
                })
            } 
            })
          }
        }
      })
    }
  })
}
exports.createSpill = (req, res) => {
  console.log(req.body)
  // // Insertamos la fila en la tabla bills
  var data = {
    community_id: "'" + req.body.community_id + "'" ,
    description: "'" + req.body.description + "'" ,
    date_p: "'" + req.body.date_p + "'" ,
    amount: "'" + req.body.amount + "'",
  }
  let query = 'INSERT INTO spill_of_money (id, community_id,amount,description) VALUES (NULL,' + data.community_id + ',' + data.amount + ',' + data.description + ')'  
  console.log(query)
  conexion.query(query, function (err, rowCount, rows) {
    if (err) {
      throw err
    } 
    else {
     // console.log('Cuenta añadida correctamente')
     // Buscamos cuantas personas estan en la comunidad 
     let string = 'PORTERIA'
     let is_available = "'" + 0 + "'"
     let porteria = "'" + string + "'"

     let query2 = 'SELECT * FROM doors_floors WHERE community_id=' + data.community_id + 'AND is_available= ' + is_available + 'AND door<>' + porteria
     console.log(query2)
     conexion.query(query2, function (err, rowCount, rows) {
      if (err) {
        throw err
      } 
      else {
        let numPersonas = rowCount.length
        let amountPersona = req.body.amount / numPersonas
          for (let persona of rowCount) {
          console.log('Añadimos la fila con el gasto de la persona con id floors de la derrama: ' + persona.id + ' la cantidad de: ' + amountPersona + ' con puerta: ' + persona.door + ' y piso: ' + persona.floor) 
          let dataquery = {
          doors_floors_id: "'" + persona.id + "'" ,
          type_bill: "'" + 'NULL' + "'" ,
          is_spill:"'" +  1 + "'" ,
          amount:"'" + amountPersona + "'" 
          }
        let query3 = 'INSERT INTO debs (id, door_floors_id,date_p,type_bill,is_spill,amount, description) VALUES (NULL,' + dataquery.doors_floors_id + ',' + data.date_p + ','+ dataquery.type_bill + ',' + dataquery.is_spill + ',' + dataquery.amount + ',' + data.description +')'  
        conexion.query(query3, function (err, rowCount, rows) {
        if (err) {
          throw err
        } else {
          let query4 = 'INSERT INTO payments (id, deb_id,type_bill,is_spill,amount, description, d_deb) VALUES (NULL,' + "'" + rowCount.insertId + "'" + ',' + dataquery.type_bill + ',' + dataquery.is_spill + ',' + "'" + 0 + "'" + ',' + data.description  + ',' + data.date_p +')'
          conexion.query(query4, function (err, rowCount, rows) {
            if (err) {
              throw err
            } else {
              return res.status(200)               
            } 
            })
        } 
        })
      }
    }
  })
}
})
}

exports.findAllDebs = (req, res) => {
  let data = {
    community_id: "'" + req.body.community_id + "'" , 
    door: "'" + req.body.door + "'", 
    floor:"'" +  req.body.floor + "'", 
  }
  let query = "SELECT * FROM doors_floors WHERE community_id= " + data.community_id + 'AND door=' + data.door + 'AND floor=' + data.floor
  conexion.query(query, function (err, rowCount, rows) {
    if (err) {
      throw err
    } else {
      let doors_floors_id = "'" + rowCount[0].id + "'"
      let query2 = "SELECT * FROM debs WHERE door_floors_id= " + doors_floors_id + 'AND amount >' + "'" + 0 + "'"
      conexion.query(query2, function (err, rowCount, rows) {
        if (err) {
          throw err
        } else {
          // console.log(rowCount)
          let dataResponse = rowCount
          // console.log(dataResponse)
          res.status(200).send({dataResponse})    
        } 
      })
    } 
  })
}
exports.findAllDebsAllIds = (req, res) => {
  let data = {
    community_id: "'" + req.body.community_id + "'" , 
    door: "'" + req.body.door + "'", 
    floor:"'" +  req.body.floor + "'", 
  }
  let query = "SELECT * FROM doors_floors WHERE community_id= " + data.community_id + 'AND door=' + data.door + 'AND floor=' + data.floor
  conexion.query(query, function (err, rowCount, rows) {
    if (err) {
      throw err
    } else {
      let doors_floors_id = "'" + rowCount[0].id + "'"
      let query2 = "SELECT * FROM debs WHERE door_floors_id= " + doors_floors_id
      conexion.query(query2, function (err, rowCount, rows) {
        if (err) {
          throw err
        } else {
          // console.log(rowCount)
          let dataResponse = []
          for (let row of rowCount) {
            dataResponse.push(row.id)
          }
          console.log(dataResponse)
          res.status(200).send({dataResponse})    
        } 
      })
    } 
  })
}

exports.findAllBills = (req, res) => {
  let community_id = "'" + req.body.community_id + "'" 
  let query = "SELECT * FROM bills WHERE community_id= " + community_id
  conexion.query(query, function (err, rowCount, rows) {
    if (err) {
      throw err
    } else {
          let dataResponse = rowCount
          res.status(200).send({dataResponse})    
        } 
  })
} 
exports.findPayment = (req, res) => {
  let deb_id = "'" + req.query.deb_id + "'"
  let query = 'SELECT * FROM payments WHERE deb_id=' + deb_id
  conexion.query(query, function (err, rowCount, rows) {
    if (err) {
      throw err
    } else {
      res.status(200).send(rowCount)    
    } 
  })
}

exports.pay = (req,res) => {
  let now = new Date()
  let dataQuery = {
    deb_id: "'" + req.body.deb_id + "'",
    amount: "'" + req.body.amount + "'",
    d_payment: "'" + now + "'"
  }
  let query = 'UPDATE payments SET amount=' +  dataQuery.amount + ', d_payment= ' + dataQuery.d_payment + 'WHERE deb_id=' + dataQuery.deb_id
  conexion.query(query, function (err, rowCount, rows) {
    if (err) {
      throw err
    } else {
      console.log('Pago registrado, descontamos la deuda')
      let newAmount = "'" + 0 + "'"
      let query2 =  'UPDATE debs SET amount=' +  newAmount + 'WHERE id=' + dataQuery.deb_id
      conexion.query(query2, function (err, rowCount, rows) {
        if (err) {
          throw err
        } else {
          res.status(200).send({message:'Deuda quitada correctamente'})   
        } 
      })   
    } 
  })
}