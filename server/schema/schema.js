const graphql = require("graphql");
const _ = require("lodash");

const { 
    GraphQLID,
    GraphQLInt,
    GraphQLObjectType, 
    GraphQLSchema, 
    GraphQLString 
} = graphql;


// dummy data 
const books = [
    { name: "Sex in the city", genre: "Gore", id: "1", authorId: "1" }, 
    { name: "Ang pagdadalaga ni maximo oliveros", genre: "Gore", id: "2", authorId: "1"}, 
    { name: "Kakantutin ko ung bestriend ko", genre: "Gore", id: "3", authorId: "2" }
];

const authors = [
    { name: "Ralph Largo", age: 23, id: "1" },
    { name: "Morissette Amon", age: 23, id: "2" },
    { name: "Denise Barbacena", age: 25, id: "3" },
];

const AuthorType = new GraphQLObjectType({
    name: "Author",
    fields: () => ({
        id: { type: GraphQLID },
        age: { type: GraphQLInt},
        name: { type: GraphQLString },
    })
});

const BookType = new GraphQLObjectType({
    name: "Book",
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        author: {
            type: AuthorType,
            resolve(parent, args) {
                return _.find(authors, { id: parent.authorId });
            }
        }
    })
});

const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        author: {
            type: AuthorType,
            args: {
                id: { type: GraphQLID }
            },
            resolve(parent, args){
                return _.find(authors, { id: args.id })
            }
        },
        book: {
            type: BookType,
            args: {
                id: { type: GraphQLID }
            },
            resolve(parent, args){
                return _.find(books, { id: args.id })
            }
        },
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
});