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

// We search if there is any user with this id in this same community
exports.searchDFExist = (req,res) => {
 let data = {
   user_id: "'" + req.query.user_id + "'",
   community_id: "'" + req.query.community_id + "'",
 }
 let query = 'SELECT * FROM doors_floors WHERE user_id=' + data.user_id + 'AND community_id=' + data.community_id
 conexion.query (query, function (err, rowCount, rows) {
   if (err) {
     throw err
   } else {
     res.status(200).send({rowCount}) 
   } 
 })
}

// Insert new doorman on doors_floors and update data of community about doorman
exports.updateFDDoorman = (req,res) => {
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

// Create rows on doors_floors of community configuration (houses)
exports.insertRowsFD = (req,res) => {
  if (req.body.community_id != undefined && req.body.floor != undefined && req.body.door != undefined){
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

// Update data floor and door, president and new users (assign home to a user)
exports.uptadeFD = (req,res) => {
  let data = {
    id: "'" + req.body.id + "'" ,
    myFloor: "'" + req.body.myFloor + "'" ,
    myDoor: "'" + req.body.myDoor + "'",
    role_id: "'" + req.body.role_id + "'",
    community_id: "'" + req.body.community_id + "'",
    is_available: "'" + 0 + "'",
  }
  let query = 'UPDATE doors_floors SET user_id=' + data.id + ',' + 'is_available=' +  data.is_available + ',role_id=' + data.role_id + 'WHERE floor=' + data.myFloor + 'AND door=' + data.myDoor + 'AND community_id=' + data.community_id
  conexion.query(query, function (err, rowCount, rows) {
    if (err) {
      throw err
    } 
    else {
      res.status(200).send({message:' actualizado'})   
    }
  })
} 

// Delegation of role of president in another house
exports.updatePresident = (req, res) => {
  let dataQuery = {
    floorNew: "'" + req.body.floorNew + "'",
    doorNew: "'" + req.body.doorNew + "'",
    floorP: "'" + req.body.floorP + "'",
    doorP: "'" + req.body.doorP + "'",
    newPresidentRole: "'" + 1 + "'",
    newRole: "'" + 3 + "'"
  }
  let query = 'UPDATE doors_floors SET role_id=' +  dataQuery.newPresidentRole + 'WHERE floor=' + dataQuery.floorNew + 'AND door=' + dataQuery.doorNew
  conexion.query(query, function (err, rowCount, rows) {
    if (err) {
      throw err
    } 
    else {
      let query2 = 'UPDATE doors_floors SET role_id=' +  dataQuery.newRole + 'WHERE floor=' + dataQuery.floorP + 'AND door=' + dataQuery.doorP
      conexion.query(query2, function (err, rowCount, rows) {
        if (err) {
          throw err
        } 
        else {
          res.status(200).send({message:'Designación correcta'})
        }
      })
    }
  })
}

// Search my tickets
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

// Remove Debs and payments of user if amount is correctly
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

// Remove doorman of community
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

// Remove a user for a home 
exports.deleteOH = (req, res) => {
  let data = {
    community_id: "'" + req.body.community_id + "'" , 
    door: "'" + req.body.door + "'", 
    floor:"'" +  req.body.floor + "'", 
  }
  let query = "UPDATE doors_floors SET user_id=" + "'" + null + "'"  + ", is_available= " + "'" + 1 + "'"  + "WHERE community_id= " + data.community_id + 'AND door=' + data.door + 'AND floor=' + data.floor
  conexion.query(query, function (err, rowCount, rows) {
    if (err) {
      throw err
    } else {
      res.status(200).send({message:'Usuario eliminado de la vivienda'})    
    }
  })
}
