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
// Create new Spill
exports.createSpill = (req, res) => {
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
                        let dataquery = {
                            doors_floors_id: "'" + persona.id + "'" ,
                           // type_bill: "'" + NULL + "'" ,
                            is_spill:"'" +  1 + "'" ,
                            amount:"'" + amountPersona + "'" 
                        }
                        let query3 = 'INSERT INTO debs (id, door_floors_id,date_p,type_bill,is_spill,amount, description) VALUES (NULL,' + dataquery.doors_floors_id + ',' + data.date_p + ',NULL,' + dataquery.is_spill + ',' + dataquery.amount + ',' + data.description + ')'  
                       conexion.query(query3, function (err, rowCount, rows) {
                            if (err) {
                                throw err
                            } else {
                                let query4 = 'INSERT INTO payments (id, deb_id,type_bill,is_spill,amount, description,d_deb) VALUES (NULL,' + "'" + rowCount.insertId + "'" + ', NULL,' + dataquery.is_spill + ',' + "'" + 0 + "'" +  ',' + data.description + ',' + data.date_p +')'
                               console.log(query4)
				 conexion.query(query4, function (err, rowCount, rows) {
                                if (err) {
                                    throw err
                                } else {
                                    console.log('OKEY')   
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

// Create new Bill
exports.createBill = (req, res) => {
	console.log(req.body)
	console.log('BODY DEL CREATE BILL')
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
                    let query3 = 'INSERT INTO debs (id, door_floors_id,date_p,type_bill,is_spill,amount) VALUES (NULL,' + dataquery.doors_floors_id + ',' + data.date_p + ',' + dataquery.type_bill + ',' + dataquery.is_spill + ',' + dataquery.amount  +')'
                    console.log(query3)
                        console.log('QUERY DE NEW BILL')
			conexion.query(query3, function (err, rowCount, rows) {
                        if (err) {
                            throw err
                        } else {
                            let query4 = 'INSERT INTO payments (id, deb_id,type_bill,is_spill,amount,d_deb) VALUES (NULL,' + "'" + rowCount.insertId + "'" + ',' + dataquery.type_bill + ',' + dataquery.is_spill + ',' + "'" + 0 + "'" +  ',' + data.date_p + ')'
                            conexion.query(query4, function (err, rowCount, rows) {
                                if (err) {
                                    throw err
                                } else {
                                    console.log('OKEY')
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

// Find payment
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

// Find all debs of user 
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

// Find all the deb ids to be able to find all the payments of that user
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

// Find all bills of community
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

// Register one payment
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
