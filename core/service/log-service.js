const root = require('../root');
const util = require(root.base_dir + '/util/util.js');

module.exports = {

    logger: req => new Promise(async (resolve, reject) => {
        try {
            let payload = await util.get_request_data(req);
            console.log("Request",req.method,req.url,payload);
            
            let requestData = {};
            requestData.time = new Date();
            requestData.method = req.method;
            requestData.url = req.url;
            if (req.method == "POST" || req.method == "PUT") {
                util.tryParse(payload, res => {
                    requestData.payload = res;
                })
            }
            await util.writeFile(JSON.stringify(requestData));
            resolve("successfully logged");
        } catch(error) {
            console.log(error.message);
        }
    })

}