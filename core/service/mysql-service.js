const root = require('../root');
const con = require(root.base_dir + '/repository/conn.js');
const pool = con.pool;

module.exports = {
    exec: query => new Promise((resolve, reject) => {
        pool.query(query, function (error, results, fields) {
            if (error) throw error;
            resolve(results);
        }); 
    })
}