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
        console.log("Connected to MongoDB");
    }
});

// ********************************* POST APIs ********************************* 
app.post("/post-item", (req, res) => {
    const data = req.body;

    db.collection("items")
        .insertOne(data)
});


// ********************************* GET APIs ********************************* 

// *** BATTLE PAGE
app.get("/items", async (req, res) => {
    try {
        const items = []

        const data = await getSampledData();
        items.push(data)
        res.status(200).send(items[0]);    
    }
    catch (err) {
        res.status(500).send(err);
    }
});

async function getSampledData() {
    const response = await db.collection("items").aggregate([
      { $sample: { size: 2 } }
    ]).toArray();
    //const response = await db.collection("items").find().limit(2).toArray();
    return response
}

// *** GALLERY PAGE
app.get("/all-items", async (req, res) => {
    try {
        const items = []
        const data = await db.collection("items")
            .find().toArray();
        
        items.push(data)
        res.status(200).send(items[0]);
    } 
    catch (err) {
        res.status(500).send(err);
    }
});

// *** ITEM-DETAILS PAGE
app.get("/item-details/:id", async (req, res) => {
    try {
        const data = {
            itemDetail: null,
            battlesWon: null
        }
        // Returns the clicked image
            data.itemDetail = await db.collection("items")
                .find({_id: ObjectId(req.params.id)}).toArray(); 
        // Returns all the battles an item has won
            data.battlesWon = await db.collection("battles")
                .find({'winner._id': req.params.id}).toArray();
        res.status(200).send(data);
    }
    catch (err) {
        res.status(500).send(err);
    }
})

// *** STATISTICS PAGE
app.get("/statistics", async (req, res) => {
    try {
        const winningItems = [];
        const losingitems = [];
    
        const winning = await db.collection("items")
            .find()
            .sort({wins: -1})
            .limit(5)
            .toArray();
    
        const losing = await db.collection("items")
        .find()
        .sort({defeats: -1})
        .limit(5)
        .toArray();
        
        winningItems.push(winning);
        losingitems.push(losing);
        const items = [winningItems[0], losingitems[0]];
        res.status(200).send(items);
    }
    catch (err) {
        res.status(500).send(err)
    }
});

// *** HISTORY PAGE
app.get("/history", async (req, res) => {
    try {    
        const data = await db.collection("battles")
            .find()
            .toArray();

        async function getHistory() {
            const history = [];

            for(const element of data) {
                const battle = {
                    _id: Math.random(),
                    winner: null,
                    loser: null
                }
                const winners = await db.collection("items").find({_id: ObjectId(element.winner._id)}).toArray();
                const losers =  await db.collection("items").find({_id: ObjectId(element.loser._id)}).toArray();
                battle.winner = winners[0];
                battle.loser = losers[0];
                history.push(battle)
            }
            return history
        }
        const battles = await getHistory();
        res.status(200).json(battles);
    } catch (err) {
        res.status(500).send(err);
    }
});


// ********************************* PATCH APIs ********************************* 

app.patch("/update-item", (req, res) => {
    try {
        let data = req.body;
    
        let losingItemIndex = data.losingItem.findIndex(item => item._id === data.winningItem._id)
        let losingItem = data.losingItem;
        losingItem.splice(losingItemIndex, 1)
    
        db.collection("items")
            .updateOne({_id: ObjectId(data.winningItem._id)}, {$inc: {wins: 1, games: 1}});
        
        db.collection("items")
            .updateOne({_id: ObjectId(losingItem[0]._id)}, {$inc: {defeats: 1, games: 1}});
    
        db.collection("battles")
            .insertOne({winner: {name: data.winningItem.name, imgName: data.winningItem.imgName, _id: data.winningItem._id}, loser: {name: losingItem[0].name, imgName: losingItem[0].imgName, _id: losingItem[0]._id}});
        res.status(200).json({result: "success"});
    }
    catch (err) {
        res.status(500).send(err);
    }
});

// ********************************* DELETE APIs ********************************* 

app.delete("/delete-item", (req, res) => {
    const data = req.body;

    db.collection("items")
        .deleteOne({_id: ObjectId(data.item)})
});

// ********************************* EXPERIMENT ********************************* 