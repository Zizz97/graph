import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'

const app = express()

app.use(bodyParser.json())


const mongodbUrl = 'mongodb+srv://stefan:Q5wNbTiO3p44pj3o@cluster0-hdguq.mongodb.net/domaci3?retryWrites=true&w=majority'
mongoose.connect(
    mongodbUrl, 
    { 
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
)
.then(result => {
    app.listen(8080, () => {
        console.log('http://localhost:8080/graphql')
    })
})
.catch(err => {
    console.log(err)
})