const root = require('../root');
const mysql = require(root.base_dir + '/service/mysql-service.js');
const log = require(root.base_dir + '/service/log-service.js');
const util = require(root.base_dir + '/util/util.js');
const config = require(root.base_dir + '/config/config.json');

module.exports = {
    call: (req,key) => new Promise(async (resolve, reject) => {

        // LOG REQUESTS
        log.logger(req)
        .then(res => console.log(res))
        .catch(error => console.log(error.message))

        let payload;

        if(req.method == 'POST' || req.method == 'PUT') {            
            // UPDATE DATABASE
            try {  
                payload = await util.get_request_data(req);
                util.tryParse(payload, res => {
                    let {db, data} = res;
                    if (config.tables.includes(db) || config.tables.includes(key)) {
                        try {
                            if(req.method=='POST') {
                                data.map(row => {
                                    mysql.exec(`INSERT INTO Product(price, date) VALUES (${row.price}, '${row.date}')`);
                                })
                            }
                            if(req.method=='PUT') {
                                mysql.exec(`UPDATE Product SET price=${res.price}, date='${res.date}' WHERE id=${res.id}`);
                            }
                        } catch (error) {
                            console.log(error.message);
                            log.logger(error.message)
                            .catch(error => console.log(error.message))
                            reject(error.message);
                        }
                    }
                    resolve("success");
                });
            } catch (error) {
                console.log(error.message);
                reject(error);
            }
        }
        
    })
}