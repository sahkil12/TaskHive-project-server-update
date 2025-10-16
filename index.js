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

app.get('/', (req, res)=>{
    res.send("TaskHive Make There Server Successfully Updated Now")
})

app.listen(port, ()=>{
    console.log(`TaskHive Server Port Running on ${port}`);
})

// TaskHive_Project
// L80iJ7kpYUOmA1vG