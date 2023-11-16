export const typeDefs = `#graphql 
type Game {
    id: ID!
    title:String!
    platform: [String!]!
}
type Review{
    id:ID!
    rating:Int!
    content:String!
}
type Author{
    id:ID!
    name:String!
    verified:Boolean!
}
type Query{
  reviews:[Review]
  review(id:ID!):Review
  games:[Game]
  game(id:ID!):Game
  authors:[Author]
  author(id:ID!):Author
}


`
// ! is to make it is must value and should be not null
//int, float,string,boolean,ID - datatypes
//query type is a must in every schema and let the return type mentioned