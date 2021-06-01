const root = require('../root');
const config = require(root.base_dir + '/config/config.json');
const nosql = require(root.base_dir + config.noSqlPath);
const util = require(root.base_dir + '/util/util.js');
const log = require(root.base_dir + '/service/log-service.js');


module.exports = {
    post_handler: async (path, req, res) => {

        res.setHeader('Content-Type', 'application/json'); 
        
        if (path == "setkey") {

            try {
                let payload = await util.get_request_data(req);

                util.tryParse(payload, parsed => {                                    
                    let {db, data} = parsed;
                    nosql.setObjectKey(db,data).then( db => {
                        res.end(JSON.stringify(db));
                    });
                })
            } catch(error) {
                console.log(error.message);
                log.logger(error.message);
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