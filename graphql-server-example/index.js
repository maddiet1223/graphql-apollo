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
        game(_parent,args){
            return db.games.find((game)=>game.id === args.id)
        },
        authors(){
            return db.authors
        },
        author(_parent,args){
            return db.authors.find((author)=>author.id === args.id)
        },
        reviews(){
            return db.reviews
        },
        review(_parent,args){
            return db.reviews.find((review)=>review.id === args.id)
        },
    },
    Game:{
        reviews(parent){
            return db.reviews.filter((r)=>r.game_id === parent.id)
        }
    },
    Author:{
        reviews(parent){
            return db.reviews.filter((r)=>r.author_id === parent.id)
        }
    },
    Review:{
        author(parent){
            return db.authors.find((a)=>a.id === parent.author_id)
        },
        game(parent){
            return db.games.find((g)=>g.id === parent.game_id)
        },
    },
    Mutation:{
        addGame(_,args){
            let game = {
                ...args.game,
                id:Math.floor(Math.random()*10000).toString()  
            }
            db.games.push(game)
            return game
        },
        deleteGame(_,args){
            db.games = db.games.filter((g)=>g.id !== args.id)
            return db.games
        },   
        updateGame(_,args){
            db.games = db.games.map((g)=>{
                if(g.id === args.id){
                    return {...g,...args.edits}
                }
                return g
            })
            return db.games.find((g)=>g.id === args.id)
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