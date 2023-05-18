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

exports.searchTickets = (req,res) => {
  let dataQuery = {
    community_id : "'" + req.body.community_id + "'",
    floor : "'" + req.body.floor + "'",
    door : "'" + req.body.door + "'",
  }
  let query = 'SELECT * FROM doors_floors WHERE community_id=' + dataQuery.community_id + 'AND floor=' + dataQuery.floor + 'AND door=' + dataQuery.door
  conexion.query (query, function (err, rowCount, rows) {
    if (err) {
      throw err
    } else {
      let tickets = rowCount[0].tickets
      res.status(200).send({tickets}) 
    }
  })
} 
exports.sendTicket = (req,res) => {
  console.log(req.body)
  let dataQuery = {
    community_id : "'" + req.body.community_id + "'",
    floor : "'" + req.body.floor + "'",
    door : "'" + req.body.door + "'",
    tickets : "'" + req.body.tickets + "'",
  }
  let date = new Date()
// console.log(date.toLocaleDateString())
  let query = 'UPDATE doors_floors SET tickets=' + dataQuery.tickets + 'WHERE community_id=' + dataQuery.community_id + 'AND floor=' + dataQuery.floor + 'AND door=' + dataQuery.door
  conexion.query (query, function (err, rowCount, rows) {
    if (err) {
      throw err
    } else {
      let mailOptions = {
        from: '"Neighborhood Community" ' +  mailConfig.auth.user,
        to: '' + req.body.email,
        subject: 'TICKET DE INVITACIÓN A PISCINA: ' + date.toLocaleDateString(),
        text:  'Hola, espero que puedas disfrutar de los servicios aportados por la piscina de mi comunidad, no olvides tener a mano el ticket adjunto por si alguien te lo solicita, disfruta y que pases un buen dia!',     
        attachments: [
          {
            filename: date.toLocaleDateString() + '-ticket.png',
            path:  __dirname + '/ticket.png',
            cid: 'uniq-ticket.png' 
          }
        ] 
      }
      console.log(mailOptions)
      mailTransporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log("Error email sent!", error)
        } 
        else {
          console.log('Email sent: ')
        }
        mailTransporter.close()
      })
      res.status(200).send({msg:'sent'}) 
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
      let date = new Date()
      // console.log(date.toLocaleDateString())
      let mailOptions = {
        from: '"Neighborhood Community" ' +  mailConfig.auth.user,
        to: '' + email,
        subject: 'JUNTA DE VECINOS: ' + req.body.date,
        text:  'Muy Sr. mío: \n De conformidad con lo dispuesto en la Ley de Propiedad Horizontal, me permito convocarle a la Junta General Ordinaria de esta comunidad, que tendrá lugar el próximo día ' + req.body.date + ', a las: ' + req.body.hour + ' cuya orden del dia es: ' + req.body.orderDay + ', esperamos su asistencia \n Un saludo ',     
        // attachments: [
        //   {
        //     filename: date.toLocaleDateString() + '-ticket.png',
        //     path:  __dirname + '/ticket.png',
        //     cid: 'uniq-ticket.png' 
        //   }
        // ]
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
                  console.log('OK')
                  } 
                })
            } 
            })
          }
          res.status(200).send({message:'Cuenta añadida'})
        }
      })
    }
  })
}
exports.createSpill = (req, res) => {
  // // Insertamos la fila en la tabla bills
  var data = {
    community_id: "'" + req.body.community_id + "'" ,
    description: "'" + req.body.description + "'" ,
    date_p: "'" + req.body.date_p + "'" ,
    amount: "'" + req.body.amount + "'",
  }
  let query = 'INSERT INTO spill_of_money (id, community_id,amount,description) VALUES (NULL,' + data.community_id + ',' + data.amount + ',' + data.description + ')'  
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
          // console.log('Añadimos la fila con el gasto de la persona con id floors de la derrama: ' + persona.id + ' la cantidad de: ' + amountPersona + ' con puerta: ' + persona.door + ' y piso: ' + persona.floor) 
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
              console.log('ok')   
            } 
            })
        } 
        })
      }
      res.status(200).send({message:'Derrama añadida'})
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
          let dataResponse = rowCount
          res.status(200).send({dataResponse})    
        } 
      })
    } 
  })
}
exports.contact = (req,res) => {
  let mailOptions = {
    from: '"Neighborhood Community" ' +  mailConfig.auth.user,
    to: '' + req.body.email,
    subject: 'Mensaje del portero de la comunidad',
    text: '¡Hola! El portero de la comunidad queria contactar con usted: ' + req.body.msg
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
    res.status(200).send({message: 'Correo enviado correctamente '})
}

exports.deleteDoorman = (req,res) => {
  let dataQuery = {
    community_id: "'" + req.query.community_id + "'",
    door: "'" + 'PORTERIA' + "'",
    floor: "'" + 0 + "'",
  }
  let query = 'SELECT * FROM doors_floors WHERE community_id= ' + dataQuery.community_id +'AND door=' + dataQuery.door + 'AND floor=' + dataQuery.floor
  conexion.query(query, function (err, rowCount, rows) {
    if (err) {
      throw err
    } else {
      if (rowCount.length === 0) {
        return res.status(200).send({vacio:true})    
      } else {
        let query2 = 'DELETE FROM doors_floors WHERE community_id= ' + dataQuery.community_id +'AND door=' + dataQuery.door + 'AND floor=' + dataQuery.floor
        conexion.query(query2, function (err, rowCount, rows) {
          if (err) {
            throw err
          } else {
            
            let doorman_active = "'" + 0 + "'"
            let query3 = 'UPDATE community SET doorman_active=' +  doorman_active + 'WHERE id=' + dataQuery.community_id
            conexion.query(query3, function (err, rowCount, rows) {
              if (err) {
                throw err
              } else {
                return res.status(200).send({vacio:false})                
              }
            })              
          }
        })
      }
    }
  })
}
exports.deleteDP = (req, res) => {
  let data = {
    community_id: "'" + req.query.community_id + "'" , 
    door: "'" + req.query.door + "'", 
    floor:"'" +  req.query.floor + "'", 
  }
  let query = "SELECT * FROM doors_floors WHERE community_id= " + data.community_id + 'AND door=' + data.door + 'AND floor=' + data.floor
  conexion.query(query, function (err, rowCount, rows) {
    if (err) {
      throw err
    } else {
      var doors_floors_id = "'" + rowCount[0].id + "'"
      let query2 = "SELECT * FROM debs WHERE door_floors_id= " + doors_floors_id
      conexion.query(query2, function (err, rowCount, rows) {
        if (err) {
          throw err
        } else {
          let arrayDebs = rowCount
          for (let deb of arrayDebs){
            let query3 = "DELETE FROM payments WHERE deb_id=" + "'" + deb.id + "'"
            console.log(query3)
            conexion.query(query3, function (err, rowCount, rows) {
              if (err) {
                throw err
              } else {
                console.log('Pago eliminado con id:' + deb.id)
              }
            })
          } 
          let query4 = "DELETE FROM debs WHERE door_floors_id= " + doors_floors_id
          console.log(query4)
          conexion.query(query4, function (err, rowCount, rows) {
            if (err) {
              throw err
            } else {
              res.status(200).send({message:'Registros borrados'})    
            }
          })
        } 
      })
    } 
  })
}
exports.deleteOH = (req, res) => {
  let data = {
    community_id: "'" + req.body.community_id + "'" , 
    door: "'" + req.body.door + "'", 
    floor:"'" +  req.body.floor + "'", 
  }
  let query = "UPDATE doors_floors SET user_id=" + "'" + null + "'"  + ", is_available= " + "'" + 1 + "'"  + "WHERE community_id= " + data.community_id + 'AND door=' + data.door + 'AND floor=' + data.floor
  console.log(query)
  conexion.query(query, function (err, rowCount, rows) {
    if (err) {
      throw err
    } else {
      console.log('Funciona')
      res.status(200).send({message:'Usuario eliminado de la vivienda'})    
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
  let query = 'SELECT * FROM payments WHERE deb_id=' + deb_id +'AND amount>' + "'" + 0 + "'"
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