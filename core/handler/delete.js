const root = require('../root');
const config = require(root.base_dir + '/config/config.json');
const nosql = require(root.base_dir + config.noSqlPath);


module.exports = {
    
    delete_handler: async (path,key,val,res) => {
        console.log("Path:", path, "Key:", key);
        if(val != null) console.log("Val", val);
        if(val != null && path == "deletekey") {
            nosql.deleteKeyId(key,val).then( db => { 
                res.end(JSON.stringify(db));
            });  

        } else if(path == "deletekey") {
            nosql.deleteKey(key).then( db => { 
                res.end(JSON.stringify(db));
            });  
        }

        
    }
}