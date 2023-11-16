import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
//db
import db from '../graphql-server-example/_db.js'

//types
import { typeDefs } from '../graphql-server-example/schema.js';

const resolvers = {
    Query :{
        games(){
            return db.games
        },
        authors(){
            return db.authors
        },
        reviews(){
            return db.reviews
        },
        review(_parent,args){
            return db.reviews.find((review)=>review.id === args.id)
        },
        game(_parent,args){
            return db.games.find((game)=>game.id === args.id)
        },
        author(_parent,args){
            return db.authors.find((author)=>author.id === args.id)
        }
       
    }
       
}



/* 
how will we query
games{ 
    title
}

the apollo server will take the title field from the games schema for us

*/ 

//serve setup

const server = new ApolloServer({
   //type definition of different data is typeDefs
   typeDefs,
   //resolvers - any incoming request to return data to the client
   resolvers

   //schema - represents the shape of the graph and data available on it
  
})


const {url} = await startStandaloneServer(server,{
    listen:{port : 4000}
})

console.log('Server ready at port ',4000)