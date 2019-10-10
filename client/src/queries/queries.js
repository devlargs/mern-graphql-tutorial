import { gql } from "apollo-boost";

const addBookMutation = gql`
    mutation($name: String!, $genre: String!, $authorId: ID!) {
        addBook(name: $name, genre: $genre, authorId: $authorId) {
            name, 
            genre,
            id
        }
    }
`;

const getAuthorsQuery = gql`{
    authors {
        name,
        id 
    }
}`;

const getBookQuery = gql`
    query($id: ID){
        book(id: $id) {
            name,
            id,
            genre,
            author {
                id,
                name,
                age, 
                books {
                    name, 
                    id
                }
            }
        }
    }
`

const getBooksQuery = gql`{
    books {
        name,
        id 
    }
}`;

export { 
    addBookMutation,
    getAuthorsQuery,
    getBookQuery,
    getBooksQuery
}