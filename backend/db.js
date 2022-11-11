const { MongoClient } = require("mongodb");
require("dotenv").config({path: "./config.env"});
const URI = process.env.URI

let dbConnection;

module.exports = {
    connectToDb: (cb) => {
        MongoClient.connect(URI)
        .then((client) => {
            dbConnection = client.db("deserted-island")
            console.log("Connected to MongoDB Atlas");
            return cb()
        })
        .catch(error => {
            console.log(error);
            return cb(error);
        })
    },
    getDb: () => dbConnection
};