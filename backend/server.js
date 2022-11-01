const express = require("express");
const cors = require("cors");
const { connectToDb, getDb } = require("./db");
const { ObjectId } = require("mongodb");

const app = express();

app.use(express.json());
app.use(cors({origin: "*"}));

let db;

connectToDb((error) => {
    if(!error) {
        app.listen(3000, (req, res) => {
            console.log("App listening on port 3000");
        });
        db = getDb()
    }
});


app.get("/items", (req, res) => {
    let items = [];

    db.collection("items")
        .find()
        .limit(2)
        .forEach(item => {
            items.push(item)
        })
        .then(() => {
            res.json(items)
        })
});

app.patch("/updateItem", (req, res) => {
    let data = req.body;
    console.log(data.data)

    db.collection("items")
        .updateOne({_id: ObjectId(data.data)}, {$inc: {wins: 1, games: 1}});
    
    db.collection("items")
        .updateOne({_id: ObjectId("6360ef5068f878ae78f238b3")}, {$inc: {defeats: 1, games: 1}}) 
});