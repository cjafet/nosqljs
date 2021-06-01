var mysql = require('mysql');

module.exports = {

    pool: mysql.createPool({
        connectionLimit : 1,
        host            : '192.168.99.100',
        port            : 3307,
        user            : 'root',
        password        : '123456',
        database        : 'Products'
    })

}
