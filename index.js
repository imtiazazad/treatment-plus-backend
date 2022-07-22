const express = require('express')
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;

const corsConfig = {
  origin: true,
  credentials: true,
};

app.use(cors(corsConfig));
app.options("*", cors(corsConfig));
app.use(express.json());

// DB_USER=treatment_admin
// DB_PASS=b41niHgfIaTwy8uD

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.o6vdsge.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run(){
    try{
        await client.connect();
        const productCollection = client.db('treatment_plus').collection('doctors');

        app.get('/doctor', async(req,res)=>{
          const doctors = await productCollection.find({}).toArray()
          res.send(doctors)
        })
    
        app.get('/singleDoctor', async(req,res)=>{
          const id = req.query.id;
          const filter = {_id: ObjectId(id)}
          const singleDoctor =await productCollection.findOne(filter)
          res.send(singleDoctor)
    
        })
    }
    finally{

    }
}

run().catch(console.dir);


app.get('/', (req, res) => {
  res.send('Hello doctor!')
})

app.listen(port, () => {
  console.log(`Treatment app listening on port ${port}`)
})