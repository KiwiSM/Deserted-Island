const { MongoClient } = require("mongodb");
require("dotenv").config({path: "./config.env"});
const uri = process.env.URI

let dbConnection;

module.exports = {
    connectToDb: (cb) => {
        MongoClient.connect(uri)
        .then((client) => {
            dbConnection = client.db("deserted-island")
            return cb()
        })
        .catch(error => {
            console.log(error);
            return cb(error);
        })
    },
    getDb: () => dbConnection
};