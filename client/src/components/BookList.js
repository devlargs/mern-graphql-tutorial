import React, { Component, Fragment } from 'react';
import { gql } from "apollo-boost";
import { graphql } from "react-apollo";

const getBooksQuery = gql`{
    books {
        name,
        id 
    }
}`;

class BookList extends Component { 
    displayBooks() {
        const { data } = this.props;
        if (data.loading) {
            return <div>Loading books...</div>
        } else {
            return data.books.map(q => {
                return (
                    <li key={q.id}>{q.name}</li>
                )
            });
        }
    }
    render() {
        console.log(this.props);
        return (
            <Fragment>
                <ul id="book-list">
                    {this.displayBooks()}
                </ul>
            </Fragment>
        )
    }
}


export default graphql(getBooksQuery)(BookList);
