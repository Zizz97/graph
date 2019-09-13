import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import graphqlHttp from 'express-graphql'
import graphqlSchema from './graphql/schema'
import graphiqlResolver from './graphql/resolvers'
import setHeader from './middleware/setHeader'
import auth from './middleware/auth'

const app = express()

app.use(bodyParser.json())


app.use(setHeader)

app.use(auth)


app.use(
    '/graphql', 
    graphqlHttp({
        schema: graphqlSchema,
        rootValue: graphiqlResolver,
        graphiql: true,
        customFormatErrorFn(error) {
            if (!error.originalError){
                return error
        }
      const data = error.originalError.data
      const message = error.message || 'An error occurrend.'
      const code = error.originalError.code || 500
      return { 
          message: message, 
          status: code, 
          data: data 
        }
    }
}))

app.use((error, req, res, next) => {
    console.log(error);
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({ message: message, data: data });
  });
  
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