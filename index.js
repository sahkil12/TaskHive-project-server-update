const express = require('express');
const cors = require('cors');
const app = express(); 
require('dotenv').config()
const port = process.env.PORT || 5000;
// middleware
app.use(cors())
app.use(express.json())


app.get('/', (req, res)=>{
    res.send("TaskHive Make There Server Successfully Updated Now")
})

app.listen(port, ()=>{
    console.log(`TaskHive Server Port Running on ${port}`);
})

// TaskHive_Project
// L80iJ7kpYUOmA1vG