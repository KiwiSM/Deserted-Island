const { MongoClient } = require("mongodb");
require("dotenv").config({path: "./config.env"});
const URI = process.env.URI

let dbConnection;

module.exports = {
    connectToDb: (cb) => {
        MongoClient.connect("mongodb+srv://Kiwi:Kiwi111@deserted-island.ubs0wy3.mongodb.net/?retryWrites=true&w=majority")
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