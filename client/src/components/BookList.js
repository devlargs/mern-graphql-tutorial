import React, { Component, Fragment } from 'react';
import { graphql } from "react-apollo";
import { getBooksQuery } from "../queries/queries";

// components
import BookDetails from "./BookDetails"

class BookList extends Component { 
    constructor(props) {
        super(props);

        this.state = {
            selectedBook: null
        }
    }
    displayBooks() {
        const { data } = this.props;
        if (data.loading) {
            return <div>Loading books...</div>
        } else {
            return data.books.map(q => {
                return (
                    <li onClick={(e) => this.setState({ selectedBook: q.id })} key={q.id}>{q.name}</li>
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
                <BookDetails bookId={this.state.selectedBook}/>
            </Fragment>
        )
    }
}


export default graphql(getBooksQuery)(BookList);
