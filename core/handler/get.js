const root = require('../root');
const config = require(root.base_dir + '/config/config.json');
const nosql = require(root.base_dir + config.noSqlPath);


module.exports = {
    get_handler: async (path, key, val, res) => {
        res.setHeader('Content-Type', 'application/json');

        if (path == "set") {
            // set value (set/100)
            nosql.set(key).then( db => { 
              res.end(JSON.stringify(db));
            });
        } else if (path == "setkey") {
            // set value at key (set/0/100)
            nosql.setKey(key,val).then(data => {
              res.end(JSON.stringify(data));
            });
        } else if (path == "get") {
            nosql.get().then(data => {
              console.log("main db instance",data);
              res.end(JSON.stringify(data));
            });
        } else if (path == "getkey") {
            nosql.getKey(key).then(data => {
              console.log(data);
              res.end(JSON.stringify(data));
            });
        } 
    }
}