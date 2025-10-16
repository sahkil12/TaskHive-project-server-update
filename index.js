const express = require('express');
const cors = require('cors');
const app = express(); 
require('dotenv').config()
const port = process.env.PORT || 5000;
const { MongoClient, ObjectId } = require('mongodb');
// middleware
app.use(cors())
app.use(express.json())
// mongodb connection
const uri =`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.gr8kgxz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const client = new MongoClient(uri);

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    const db = client.db('DataBase_TaskHive');
    const taskCollection = db.collection('tasks');
    // get task
    app.get('/tasks', async (req, res)=>{
      const tasks = taskCollection.find()
      const result = await tasks.toArray()
      res.send(result) 
    })
    // get 6 task for featured section
    app.get('/featuredTasks', async (req, res)=>{
        const tasks = taskCollection.find().limit(6)
        const result = await tasks.toArray()
        res.send(result) 
      })
    // get task with user email
    app.get('/myPostTasks/:email', async(req, res)=>{
        const email = req.params.email;
        const query = {email:email}
        const result =await taskCollection.find(query).toArray()
        res.send(result)  
    })   
    // find one task 
    app.get('/task/:id', async(req, res)=>{
        const id = req.params.id;
        const query = {_id:new ObjectId(id)}
        const task = await taskCollection.findOne(query)
        res.send(task)
    })
    // post task
    app.post('/tasks', async(req, res)=>{
        const task = req.body;
        const result = await taskCollection.insertOne(task);
        res.send(result)
    })
    // updated task 
    app.put('/tasks/:id', async(req, res)=>{
        const id = req.params.id;
        const filter = {_id: new ObjectId(id)}
        const task = req.body;
        const option = {upsert: true}
        const updatedTask = {
            $set: {
                title: task.title,
                category: task.category,
                deadline: task.deadline,
                budget: task.budget,
                country: task.country,
                details: task.details
            }
        }
        const result = await taskCollection.updateOne(filter, updatedTask, option)
        res.send(result)
    })
    // delete my task
    app.delete('/myPostTasks/:id', async(req, res)=>{
        const id = req.params.id;
        const query = {_id: new ObjectId(id)}
        const result = await taskCollection.deleteOne(query)
        res.send(result)
    })

    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
   
  }
}
run().catch(console.dir);


app.get('/', (req, res)=>{
    res.send("TaskHive Make There Server Successfully Updated Now")
})

app.listen(port, ()=>{
    console.log(`TaskHive Server Port Running on ${port}`);
})

// TaskHive_Project
// L80iJ7kpYUOmA1vG