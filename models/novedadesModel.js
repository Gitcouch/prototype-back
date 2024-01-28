var pool = require('./bd'); // llamado a la base de datos

 async function getNovedades() {
  var query = "select * from novedades";
  var rows = await pool.query(query);

  return rows;
}

async function insertNovedad(obj) {
  try {
    var query = "insert into novedades set ?";
    var rows = await pool.query(query, [obj])
    return rows;

  } catch (error) {
    console.error(error);
    throw error;
  } // cierra catch error
} // cierra el insert

module.exports = { getNovedades, insertNovedad };
