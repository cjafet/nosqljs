const http = require('http');
const root = require('../root');
const log = require(root.base_dir + '/service/log-service.js');


const _post = require(root.base_dir + '/handler/post.js');
const _put = require(root.base_dir + '/handler/put.js');
const _delete = require(root.base_dir + '/handler/delete.js');
const _get = require(root.base_dir + '/handler/get.js');


const middleware = require(root.base_dir + '/middleware/middleware.js');


const hostname = '127.0.0.1', port = 7700;

const server = http.createServer(async (req, res) => {   
    
  let url = req.url.split('/');
  console.log(url);

  let path = url[1].toLowerCase();
  let key = url[2];
  let val = url[3];

    // CALL middleware
    middleware.call(req,key)
    .then(res => console.log(res))
    .catch(error => {
        console.log(error.message)
    })

    switch (req.method) {
        case 'GET':
            get_handler();
            break;
        case 'POST':
            post_handler();
            break;
        case 'PUT':
            put_handler();
            break;
        case 'DELETE':
            delete_handler();
    }

    function get_handler() {
        _get.get_handler(path, key, val, res);
    }


    function post_handler() {
       _post.post_handler(path,req,res); 
    }

    function put_handler() {
        _put.put_handler(path,key,req,res);
    }


    function delete_handler() {
        _delete.delete_handler(path,key,val,res);
    }


});

server.listen(process.env.PORT || port, () => {
  console.log(`Server listening on port ${process.env.PORT || port}`);
});
