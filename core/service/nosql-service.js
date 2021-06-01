const fs = require("fs");
const root = require('../root');
const config = require(root.base_dir + '/config/config.json');
const util = require(root.base_dir + '/util/util.js');
const mysql = require(root.base_dir + '/service/mysql-service.js');

const filePath = root.base_dir + config.dbPath;
let jsonFile = require(filePath);
let ins = jsonFile;

let db;

// Always load what is in the database table (single source of truth)
if (config.mysql) {
  (init = async () => {
    await config.tables.map(async (table) => {
      db = await mysql.exec("SELECT * FROM " + table);
      ins[table] = JSON.parse(JSON.stringify(db));
      util.saveInMemory(filePath,ins);
    })
  })();
}

module.exports = {
  deleteKey: async (k) => {
    if (k != null && ins.hasOwnProperty(k)) {
      delete ins[k];
      console.log("new instance after key delete",ins);
      try {
        util.saveInMemory(filePath,ins);
      } catch (error) {
        console.log('error saving file');
        console.log(error.message);
      }
      return ins;
    }
  },
  deleteKeyId: async (k,v) => {
    if (v != null && ins.hasOwnProperty(k)) {
      let json = ins[k];
      ins[k] = json.filter(obj => obj.id != v);
      try {
        util.saveInMemory(filePath,ins);
      } catch (error) {
        console.log('error saving file');
        console.log(error.message);
      }
      return ins;
    }
  },
  setKey: async (k, v) => {
    if (k != null && v != null) {
      ins[k] = v;
      console.log(ins);
      return ins;
    }
  },
  set: async (v) => {
    if (v != null) {
      ins.push(v);
      console.log(ins);
      return ins;
    }
  },
  setObjectKey: async (k,obj) => {
    if(ins.hasOwnProperty(k)){
      if (config.tables.includes(k)) {
        products = ins[k];
        len = products.length;
        if(len!=0) console.log("ID",products[len-1].id);
        obj.map(o => {
          let product = {};
          len==0 ? product.id=1 : product.id = products[len-1].id + 1;
          ins[k].push({...product, ...o});
        })
      } else {
        obj.map(o => {
          ins[k].push(o);
        })
      }
    } else {
      ins[k] = obj;
    }
    console.log(ins);
    try {
      util.saveInMemory(filePath,ins);
      module.exports.addFile(k,obj);
    } catch (error) {
      console.log('error saving file');
      console.log(error.message);
    }
    return ins[k];
  },
  updateObjectId: async (k, obj) => {
    let json = ins[k];
    let idx;
    json.map( (el,index) => {
      if(el.id == obj.id) {
        console.log(el.id);
        console.log(obj);
        // set updated index for the return type
        idx = index;
        console.log(index);
        ins[k][index] = obj;
      }
    })
    try {
      util.saveInMemory(filePath,ins);
    } catch (error) {
      console.log('error saving file');
      console.log(error.message);
    }
    // return updated index
    return ins[k][idx];
  },
  setObject: async (obj) => {
    ins.push(obj);
    console.log(ins);
    return ins[k];
  },
  getKey: async (k) => {
    console.log(JSON.stringify(ins));
    return ins[k];
  },
  get: async () => {
    return ins;
  },
  getKeyValue: async (k,ins) => {
    return ins[k];
  },
  addFile: async (fileName,ins) => {
    try {
      util.addFile(root.base_dir + '/db/' + fileName, JSON.stringify(ins), (err) => {
        if (err) throw err;
        console.log('successful save json file!');
        return true;
      });
    } catch (e) {
      console.error('failed to save json file on disk');
      console.error(e.message);
      return false;
    }
  }
}