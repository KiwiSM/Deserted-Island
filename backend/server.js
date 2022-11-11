const express = require("express");
const cors = require("cors");
const { connectToDb, getDb } = require("./db");
const { ObjectId, LEGAL_TLS_SOCKET_OPTIONS } = require("mongodb");

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

// ********************************* POST APIs ********************************* 
app.post("/post-item", (req, res) => {
    const data = req.body;

    db.collection("items")
        .insertOne(data)
})


// ********************************* GET APIs ********************************* 

// *** BATTLE PAGE
app.get("/items", async (req, res) => {
    const items = []

    const data = await getSampledData();
    items.push(data)
    res.send(items[0]);
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
    const items = []
    const data = await db.collection("items")
        .find().toArray();
    
    items.push(data)
    res.send(items[0])
});

// *** ITEM-DETAILS PAGE
app.get("/item-details/:id", async (req, res) => {
    const data = {
        itemDetail: null,
        battlesWon: null
    }
    //To return the clicked image
        data.itemDetail = await db.collection("items")
            .find({_id: ObjectId(req.params.id)}).toArray(); 
    // To return all the battles an item has won
        data.battlesWon = await db.collection("battles")
            .find({'winner._id': req.params.id}).toArray();
    res.send(data)
})

// *** STATISTICS PAGE
app.get("/statistics", async (req, res) => {
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
    res.send(items);
});

// *** HISTORY PAGE
app.get("/history", async (req, res) => {
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
    res.json(battles);
    //console.log(battles);
});


// ********************************* PATCH APIs ********************************* 

app.patch("/update-item", (req, res) => {
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
    res.json({result: "success"});
});

// ********************************* DELETE APIs ********************************* 

app.delete("/delete-item", (req, res) => {
    const data = req.body;
    //console.log(data);

    db.collection("items")
        .deleteOne({_id: ObjectId(data.item)})
        
})

// ********************************* EXPERIMENT ********************************* 