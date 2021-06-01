const root = require('../root');
const config = require(root.base_dir + '/config/config.json');
const nosql = require(root.base_dir + config.noSqlPath);
const filePath = root.base_dir + '/test/db.json'
let jsonFile = require(filePath);


var assert = require('chai').assert


describe('NoSQL', function() {

    let payload, obj;

    beforeEach(async function () { 
        //payload = { "db": "customers", "data": [ { "id": 1, "name": "Carlos Jafet Neto", "email": "cjafet07@gmail.com", "age": 45, "gender": "Male", "profession": "Software Developer" }, { "id": 2, "name": "Carlos Jafet Neto", "email": "cjafet07@gmail.com", "age": 45, "gender": "Male", "profession": "Software Architect" }, { "id": 3, "name": "Carlos Jafet Neto", "email": "cjafet07@gmail.com", "age": 45, "gender": "Male", "profession": "CTO" } ] };
        //obj = JSON.parse(payload);
    })


    it('should return the json data for the customers database', async function() {

        let obj = { "db": "customers", "data": [ { "id": 1, "name": "Carlos Jafet Neto", "email": "cjafet07@gmail.com", "age": 45, "gender": "Male", "profession": "Software Developer" }, { "id": 2, "name": "Carlos Jafet Neto", "email": "cjafet07@gmail.com", "age": 46, "gender": "Male", "profession": "Software Architect" }, { "id": 3, "name": "Carlos Jafet Neto", "email": "cjafet07@gmail.com", "age": 47, "gender": "Male", "profession": "CTO" } ] }

        // test insert duplicated
        let sales_obj = { "db": "customers", "data": [ { "id": 1, "name": "CarlosNeto", "email": "cjafet07@gmail.com", "age": 45, "gender": "Male", "profession": "Software Developer" }, { "id": 2, "name": "Carlos Jafet Neto", "email": "cjafet07@gmail.com", "age": 46, "gender": "Male", "profession": "Software Architect" }, { "id": 3, "name": "Carlos Jafet Neto", "email": "cjafet07@gmail.com", "age": 47, "gender": "Male", "profession": "CTO" } ] }
        
        //let sales_obj = { "db": "sales", "data": [ { "id": 1, "product-id": 100, "client-id": 1, "value": 100.89 }, { "id": 2, "product-id": 101, "client-id": 2, "value": 88.99 }, { "id": 3, "product-id": 102, "client-id": 3, "value": 29.99 } ] }
        
        let db = await nosql.setObjectKey(obj.db,obj.data);

        let sales_db = await nosql.setObjectKey(sales_obj.db,sales_obj.data);

        let arrayLength = db.length;
    

        // let ids = db.map((arr) => {
        //     console.log(arr);
        //     console.log(arr.id);
        //     return arr.id;
        // })

        assert.equal()

        assert.equal(arrayLength, 3);

        assert.equal(db[0].id, 1);
        assert.equal(db[1].id, 2);
        assert.equal(db[2].id, 3);

        assert.equal(db[0].age, 45);
        assert.equal(db[1].age, 46);
        assert.equal(db[2].age, 47);
        
    });


    it('given a database key, should return the json data', async function() {

        let db = await nosql.getKey("customers");

        let arrayLength = db.length;

        assert.equal(arrayLength, 3);

        assert.equal(db[0].id, 1);
        assert.equal(db[1].id, 2);
        assert.equal(db[2].id, 3);

        assert.equal(db[0].age, 45);
        assert.equal(db[1].age, 46);
        assert.equal(db[2].age, 47);

        
    });


    it('should update database object', async function() {

        let payload = { "id": 1, "name": "Carlos Jafet Neto", "email": "cjafet@cjafet.com.br", "age": 46, "gender": "Male", "profession": "Software Developer" }
        let key = "customers";

        let db = await nosql.updateObjectId(key,payload);
        console.log("db is:", db);

        assert.equal(db.email, "cjafet@cjafet.com.br");
        assert.equal(db.age, 46);

    });


    it('should delete the database object', async function() {

        let key1 = "customers";
        let key2 = "sales";
        //let db1 = await nosql.deleteKey(key1);
        let db2 = await nosql.deleteKey(key2);


        // DELETE NOT DELETING FROM JSON FILE

        //console.log(db);
        //assert.equal(46, db.age);

    });


    // Teste SaveFile


    // See code coverage


    // See github doc examples


});
