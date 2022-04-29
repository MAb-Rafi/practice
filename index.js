const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();
const port = process.env.PORT || 5000;
const app = express();


// MIddleware

app.use(cors());
app.use(express.json());



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.yu15u.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function run() {
    try {
        await client.connect();
        const carCollection = client.db('previousProject').collection('storeCollect');
        app.get('/store', async (req, res) => {
            const query = {};
            const cursor = carCollection.find(query);
            const store = await cursor.toArray();
            res.send(store);

        });
        app.get('/store/:id', async(req,res)=>{
            const id = req.params.id;
            const query = {_id:ObjectId(id)};
            const store = await carCollection.findOne(query);
            res.send(store);
        })
        // post
        app.post('/store',async(req,res) =>{
            const newStore = req.body;
            const result = await carCollection.insertOne(newStore);
            res.send(result);
        });

        app.delete('/store/:id', async(req,res)=>{
            const id = req.params.id;
            const query = {_id: ObjectId(id)};
            const result = await carCollection.deleteOne(query);
            res.send(result);
        })

    }

    finally {

    }

}

run().catch(console.dir);


// check

app.get('/', (req, res) => {
    res.send('Bismillahir Rahmanir rahim');
});

app.get('/rafi',(req,res) =>{
    res.send('My dear wife How are you?')
})

app.listen(port, () => {
    console.log('Allahu Akbar', port)
})