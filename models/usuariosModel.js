var pool = require('./bd'); // llamado a la base de datos
var md5 = require('md5');

async function getUserByUsernameAndPassword(user, password) {
    try {
        const pw = md5(password)
        var query = 'select * from users where user = ? and password = ? limit 1';
        var rows = await pool.query(query, [user, pw]);
        

        return rows[0];
    } catch (error) {
        console.log(error);
    }
}

module.exports = { getUserByUsernameAndPassword }