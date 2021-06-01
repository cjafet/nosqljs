const fs = require('fs');
const root = require('../root');
const config = require(root.base_dir + '/config/config.json');

const logFile = root.base_dir + config.logPath;
const writeToFile = fs.createWriteStream(logFile, {
  flags: 'a'
})

module.exports = {
    get_request_data: req => new Promise((resolve, reject) => {
        
        let body = [];

        req.on('data', (chunk) => {
            body.push(chunk);
        }).on('end', () => {
            resolve(Buffer.concat(body).toString());
        });
        
    }),
    addFile: async (fileName, payload) => {
      fs.appendFile(fileName + '.json', payload, function (err) {
        if (err) throw err;
        console.log('File ' + fileName + 'Saved!');
      });
    },
    writeFile: async (payload) => {
      writeToFile.write(payload + '\r\n')
    },
    saveInMemory: async (filePath,ins) => {
      try {
        fs.writeFile(filePath, JSON.stringify(ins), (err) => {
          if (err) throw err;
          console.log('successful save json file on disk');
          return true;
        });
      } catch (e) {
        console.error('failed to save json file on disk');
        console.error(e.message);
        return false;
      }
    },
    tryParse: (payload,cb) => {
      try {
        let data = JSON.parse(payload);
        cb(data);
      } catch (error) {
        let pos = error.message.split("position");
        let _pos = parseInt(pos[1]);
        console.log(`Error at position: ${_pos}`);
        module.exports.tryParse(payload.slice(0, _pos-1) + payload.slice(_pos),cb);
      }
    }
}