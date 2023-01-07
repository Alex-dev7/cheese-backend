require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const cors = require('cors')

const app = express()

const PORT = process.env.PORT
const DATABASE_URL = process.env.DATABASE_URL


mongoose.connect(DATABASE_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true
})


mongoose.connection
    .on("open", () => console.log('You are connected to mongoose'))
    .on("close", () => console.log('You are disconnected from mongoose'))
    .on("error", (error) => console.log(error))


const CheesesSchema = new mongoose.Schema({
    name: String,
    countryOfOrigin: String,
    image: String
})

const Cheeses = mongoose.model("Cheeses", CheesesSchema)


// midleware
app.use(cors())
app.use(express.json())


// routes
app.get('/', (req, res) => {
    res.send("We Live!")
})


// index route
app.get('/cheese', async (req, res) => {
    try{
        res.json(await Cheeses.find({}))
    }catch(error){
        res.status(400).json(error)
    }
})

// create route 
app.post('/cheese', async (req, res) => {
    try {
       res.json(await Cheeses.create(req.body)) 
    }catch(error) {
        res.status(400).json(error) 
    }
})


// update route
app.post('/cheese/:id', async (req, res) => {
    try {
        res.json(await Cheeses.findByIdAndUpdate(req.params.id, req.body, {new: true}))
    } catch(error) {
        res.status(400).json(error) 
    }
})


// delete route
app.delete('/cheese/:id', async (req, res) => {
    try{
        res.json(await Cheeses.findByIdAndRemove(req.params.id))
    }catch(error) {
        res.status(400).json(error) 
    }
})

// find by id
app.get('cheese/:id', async (req, res) => {
    try{
        res.json(await Cheeses.findById(req.params.id))
    }catch(error){
        res.status(400).json(error) 
    }
})



app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
})





