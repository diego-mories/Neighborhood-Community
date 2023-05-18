var mysql = require('mysql')
const nodemailer = require('nodemailer')
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

// Search data  of communities to which the user belongs
exports.searchCommunity = (req, res) => {
    let user_id = "'" + req.query.user_id + "'"
    let query = 'SELECT * FROM doors_floors WHERE user_id=' + user_id
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

// Search name of community by id
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

// Create new Community
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
          res.status(404).send('Error al crear una comunidad con el mismo nombre ')   
        }
        
      }
    })
} 

// Update config of community
exports.updateCommunity = (req, res) => {
    let dataQuery = {
      community_id: "'" + req.body.community_id + "'",
      paddle: "'" + req.body.paddle + "'",
      tennis: "'" + req.body.tennis + "'",
      pool: "'" + req.body.pool + "'",
      cameras: "'" + req.body.cameras + "'",
    }
    let query = 'UPDATE community SET has_paddle_court=' + dataQuery.paddle + ',has_tennis_court=' + dataQuery.tennis  + ',has_pool=' + dataQuery.pool  + ',has_cameras=' + dataQuery.cameras + 'WHERE id=' + dataQuery.community_id
    conexion.query(query, function (err, rowCount, rows) {
      if (err) {
        throw err
      } 
      else {
        res.status(200).send({msg:'Datos de la comunidad actualizados correctamente'})
      }
    })
}

// Search all data of communities to Admin
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

// Search doors floors available in my community
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

// Search doors floors not available in my community except user house
exports.searchMyCommunity2 = (req, res) => {
    let community_id = "'" + req.query.community_id + "'"
    let myFloor = "'" + req.query.floor + "'"
    let myDoor = "'" + req.query.door + "'"
    let string = 'PORTERIA'
    let is_available = "'" + 0 + "'"
    let porteria = "'" + string + "'"
    let query = 'SELECT * FROM doors_floors WHERE community_id=' + community_id + 'AND is_available=' + is_available + 'AND door<>' + porteria  + ' EXCEPT SELECT * from doors_floors WHERE community_id=' + community_id + 'AND is_available=' + is_available + 'AND door=' + myDoor + 'AND floor=' + myFloor
    conexion.query(query, function (err, rowCount, rows) {
      if (err) {
        throw err
      } 
      else {
        res.status(200).send({message:'Obtenemos datos de puertas y plantas disponibles en las comunidades', floors_doors: rowCount})   
      }
    })
}

// Search if community has doorman and not registered
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