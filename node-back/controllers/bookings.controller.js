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

// If the community has a tennis court in its configuration, we create the rows in the reservations table
exports.createRowsTennis = (req, res) => {
    const communityId = req.query.community_id;
    const timeZones = [
      '09:00-10:30',
      '10:30-12:00',
      '12:00-13:30',
      '13:30-15:00',
      '15:00-16:30',
      '16:30-18:00',
      '18:00-19:30',
      '19:30-21:00',
      '21:00-22:30'
    ];
    const bookingsValues = timeZones.map((timeZone) => {
      return `(${communityId}, NULL, '${timeZone}', true)`;
    }).join(',');
    const query = `INSERT INTO bookings_t (community_id, door_floors_id, time_zone, is_available) VALUES ${bookingsValues}`;
    conexion.query(query, function (err, rowCount, rows) {
      if (err) {
        throw err;
      } else {
        res.status(200).send({msg:'Reservas creadas correctamente'});
      }
    });
}

// If the community has a paddle court in its configuration, we create the rows in the reservations table
exports.createRowsPaddle = (req, res) => {
    const communityId = req.query.community_id
    const timeZones = [
      '09:00-10:30',
      '10:30-12:00',
      '12:00-13:30',
      '13:30-15:00',
      '15:00-16:30',
      '16:30-18:00',
      '18:00-19:30',
      '19:30-21:00',
      '21:00-22:30'
    ]
    const bookingsValues = timeZones.map((timeZone) => {
      return `(${communityId}, NULL, '${timeZone}', true)`
    }).join(',');
    const query = `INSERT INTO bookings_p (community_id, door_floors_id, time_zone, is_available) VALUES ${bookingsValues}`
    conexion.query(query, function (err, rowCount, rows) {
      if (err) {
        throw err
      } else {
        res.status(200).send({msg:'Reservas creadas correctamente'})
      }
    })
}

// If the community has a paddle court in its configuration, we create the rows in the reservations table
exports.findMyBookT = (req, res) => {
    let dataQuery = {
      community_id: "'" + req.query.community_id + "'",
      floor: "'" + req.query.floor + "'",
      door: "'" + req.query.door + "'",
    }
    let query = 'SELECT * from doors_floors WHERE door=' + dataQuery.door + 'AND floor=' + dataQuery.floor + 'AND community_id=' + dataQuery.community_id
    conexion.query(query, function (err, rowCount, rows){
      if (err) {
        throw err
      } else {
        let doorsFloorsId = "'" + rowCount[0].id + "'"
        let query2 = 'SELECT * from bookings_t WHERE community_id=' + dataQuery.community_id + 'AND door_floors_id=' + doorsFloorsId 
        conexion.query(query2, function (err, rowCount, rows){
          if (err) {
            throw err
          } else {
            res.status(200).send({ rowCount})
          }
        })
      }
    })
}

// If the community has a tennis court in its configuration, we create the rows in the reservations table
exports.findMyBookP = (req, res) => {
    let dataQuery = {
      community_id: "'" + req.query.community_id + "'",
      floor: "'" + req.query.floor + "'",
      door: "'" + req.query.door + "'",
    }
    let query = 'SELECT * from doors_floors WHERE door=' + dataQuery.door + 'AND floor=' + dataQuery.floor + 'AND community_id=' + dataQuery.community_id
    conexion.query(query, function (err, rowCount, rows){
      if (err) {
        throw err
      } else {
        let doorsFloorsId = "'" + rowCount[0].id + "'"
        let query2 = 'SELECT * from bookings_p WHERE community_id=' + dataQuery.community_id + 'AND door_floors_id=' + doorsFloorsId 
        conexion.query(query2, function (err, rowCount, rows){
          if (err) {
            throw err
          } else {
            res.status(200).send({ rowCount})
          }
        })
      }
    })
}
// Search bookings if tennis court of this community
exports.findBookingsT = (req, res) => {
    let community_id = "'" + req.query.community_id + "'" 
    const query = `SELECT * FROM bookings_t WHERE community_id= ` + community_id
    conexion.query(query, function (err, rowCount, rows) {
      if (err) {
        throw err
      } else {
        res.status(200).send(rowCount)    
      } 
    })
}

// Search bookings if paddle court of this community
exports.findBookingsP = (req, res) => {
    let community_id = "'" + req.query.community_id + "'" 
    const query = `SELECT * FROM bookings_p WHERE community_id= ` + community_id
    conexion.query(query, function (err, rowCount, rows) {
      if (err) {
        throw err
      } else {
        res.status(200).send(rowCount)    
      } 
    })
}

// If the community stops having paddle court in its configuration, we create the rows in the reservations table
exports.deleteRowsPaddle = (req, res) => {
    const community_id = req.query.community_id;
    const deleteQuery = `DELETE FROM bookings_p WHERE community_id=${community_id}`
    conexion.query(deleteQuery, (err, result) => {
      if (err) {
        throw err
      } else {
        res.status(200).send({ msg: `Todas las reservas para la comunidad con ID ${community_id} han sido eliminadas.` })
      }
    })
}

// If the community stops having tennis court in its configuration, we create the rows in the reservations table
exports.deleteRowsTennis = (req, res) => {
    const community_id = req.query.community_id;
    const deleteQuery = `DELETE FROM bookings_t WHERE community_id=${community_id}`
    conexion.query(deleteQuery, (err, result) => {
      if (err) {
        throw err
      } else {
        res.status(200).send({ msg: `Todas las reservas para la comunidad con ID ${community_id} han sido eliminadas.` })
      }
    })
}

// Put reserve tennis court
exports.reserveT = (req, res) => {
    let dataQuery = {
      floor: "'" + req.body.floor + "'",
      door: "'" + req.body.door + "'",
      community_id: "'" + req.body.community_id + "'",
      time_zone: "'" + req.body.time_zone + "'",
    }
    let query = 'SELECT * from doors_floors WHERE door=' + dataQuery.door + 'AND floor=' + dataQuery.floor + 'AND community_id=' + dataQuery.community_id
    conexion.query(query, function (err, rowCount, rows){
      if (err) {
        throw err
      } else {
        let doorsFloorsId = "'" + rowCount[0].id + "'"
        let query2 = 'SELECT * from bookings_t WHERE community_id=' + dataQuery.community_id + 'AND door_floors_id=' + doorsFloorsId 
        conexion.query(query2, function (err, rowCount, rows){
          if (err) {
            throw err
          } else {
           if (rowCount.length > 0) {
            res.status(200).send({available:false, hour: rowCount[0].time_zone})
           } else {
            let is_available = "'" + 0 + "'"
            let query3 = 'UPDATE bookings_t SET is_available=' + is_available + ', door_floors_id=' + doorsFloorsId + 'WHERE community_id=' + dataQuery.community_id + 'AND time_zone=' + dataQuery.time_zone
            conexion.query(query3, (err, result) => {
              if (err) {
                throw err
              } else {
                res.status(200).send({available:true})
              }
            })
           }
          }
        })
      }
    })
}

// Put reserve paddle court
exports.reserveP = (req, res) => {
    let dataQuery = {
      floor: "'" + req.body.floor + "'",
      door: "'" + req.body.door + "'",
      community_id: "'" + req.body.community_id + "'",
      time_zone: "'" + req.body.time_zone + "'",
    }
    let query = 'SELECT * from doors_floors WHERE door=' + dataQuery.door + 'AND floor=' + dataQuery.floor + 'AND community_id=' + dataQuery.community_id
    conexion.query(query, function (err, rowCount, rows){
      if (err) {
        throw err
      } else {
        let doorsFloorsId = "'" + rowCount[0].id + "'"
        let query2 = 'SELECT * from bookings_p WHERE community_id=' + dataQuery.community_id + 'AND door_floors_id=' + doorsFloorsId 
        conexion.query(query2, function (err, rowCount, rows){
          if (err) {
            throw err
          } else {
           if (rowCount.length > 0) {
            res.status(200).send({available:false, hour: rowCount[0].time_zone})
           } else {
            let is_available = "'" + 0 + "'"
            let query3 = 'UPDATE bookings_p SET is_available=' + is_available + ', door_floors_id=' + doorsFloorsId + 'WHERE community_id=' + dataQuery.community_id + 'AND time_zone=' + dataQuery.time_zone
            conexion.query(query3, (err, result) => {
              if (err) {
                throw err
              } else {
                res.status(200).send({available:true})
              }
            })
           }
          }
        })
      }
    })
}

// Cancel my book of tennis court
exports.cancelBookT = (req, res) => {
    let dataQuery = {
      community_id: "'" + req.body.community_id + "'",
      time_zone: "'" + req.body.time_zone + "'",
      floor: "'" + req.body.floor + "'",
      door: "'" + req.body.door + "'",
    }
    let is_available = "'" + 1 + "'"
    let query = 'SELECT * from doors_floors WHERE door=' + dataQuery.door + 'AND floor=' + dataQuery.floor + 'AND community_id=' + dataQuery.community_id
    conexion.query(query, function (err, rowCount, rows){
      if (err) {
        throw err
      } else {
        let query2 = 'UPDATE bookings_t SET is_available=' + is_available + ', door_floors_id=NULL WHERE community_id=' + dataQuery.community_id + 'AND time_zone=' + dataQuery.time_zone
        conexion.query(query2, function (err, rowCount, rows){
          if (err) {
            throw err
          } else {
            res.status(200).send({ msg:'Eliiminación de reserva de forma correcta'})          
          }
        })
      }
    })
}

// Cancel my book of paddle court
exports.cancelBookP = (req, res) => {
    let dataQuery = {
      community_id: "'" + req.body.community_id + "'",
      time_zone: "'" + req.body.time_zone + "'",
      floor: "'" + req.body.floor + "'",
      door: "'" + req.body.door + "'",
    }
    let is_available = "'" + 1 + "'"
    let query = 'SELECT * from doors_floors WHERE door=' + dataQuery.door + 'AND floor=' + dataQuery.floor + 'AND community_id=' + dataQuery.community_id
    conexion.query(query, function (err, rowCount, rows){
      if (err) {
        throw err
      } else {
        let doorsFloorsId = "'" + rowCount[0].id + "'"
        let query2 = 'UPDATE bookings_p SET is_available=' + is_available + ', door_floors_id=NULL WHERE community_id=' + dataQuery.community_id + 'AND time_zone=' + dataQuery.time_zone
        conexion.query(query2, function (err, rowCount, rows){
          if (err) {
            throw err
          } else {
            res.status(200).send({ msg:'Eliiminación de reserva de forma correcta'})          
          }
        })
      }
    })
}