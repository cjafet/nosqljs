const root = require('../root');
const config = require(root.base_dir + '/config/config.json');
const nosql = require(root.base_dir + config.noSqlPath);
const util = require(root.base_dir + '/util/util.js');
const log = require(root.base_dir + '/service/log-service.js');


module.exports = {
    put_handler: async (path, key, req, res) => {

        res.setHeader('Content-Type', 'application/json'); 

        if (path == "updatekey") {

            try {
                let payload = await util.get_request_data(req);
                util.tryParse(payload, data => {                
                    nosql.updateObjectId(key,data).then(data => { 
                        console.log(data);
                        res.end(JSON.stringify(data));
                    });
                })
            } catch (error) {
                console.log(error.message);
                log.logger(error.message)
                .catch(error => console.log(error.message))
                res.statusCode = 400;
                message = {
                    "status"  : "failed",
                    "message" : error.message
                }
                res.end(JSON.stringify(message));
                
            }

           
        }
        
    }
}