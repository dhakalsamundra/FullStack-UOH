const { ApolloServer } = require('apollo-server')
const mongoose = require('mongoose')

const config = require('./utils/config')
const typeDefs = require('./typeDefs')
const resolvers = require('./resolvers')

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true,
  useCreateIndex: true, useFindAndModify: false,  })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen().then(({ url, subscriptionsUrl }) => {
  console.log(`Server ready at ${url}`)
  console.log(`Subscriptions ready at ${subscriptionsUrl}`)
})