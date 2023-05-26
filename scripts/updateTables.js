const mysql = require('mysql');

// Configura la conexión a la base de datos
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '6HQ2QcM9.Bk5ueOt',
  database: 'neighborhood_community'
});

// Función para actualizar las tablas
function updateTables() {
  // Actualiza la tabla doors_floors
  const updateDoorsFloors = `UPDATE doors_floors SET tickets = 5`;
  connection.query(updateDoorsFloors, (error, results) => {
    if (error) throw error;
    console.log(`Tabla doors_floors actualizada`);
  });

  // Actualiza la tabla bookings_t
  const updateBookingsT = `UPDATE bookings_t SET door_floors_id = NULL, is_available = true`;
  connection.query(updateBookingsT, (error, results) => {
    if (error) throw error;
    console.log(`Tabla bookings_t actualizada`);
  });

  // Actualiza la tabla bookings_p
  const updateBookingsP = `UPDATE bookings_p SET door_floors_id = NULL, is_available = true`;
  connection.query(updateBookingsP, (error, results) => {
    if (error) throw error;
    console.log(`Tabla bookings_p actualizada`);
  });
}

// Ejecuta la función para actualizar las tablas
updateTables();

// Cierra la conexión a la base de datos
connection.end();
