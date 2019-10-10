import React, { Component  } from 'react';
import { graphql } from "react-apollo";
import { compose } from "redux";
import { addBookMutation, getAuthorsQuery, getBooksQuery } from "../queries/queries";

class AddBook extends Component { 
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            genre: "",
            authorId: ""
        }
    }
    displayAuthors() {
        const data = this.props.getAuthorsQuery;
        if (data.loading) {
            return (
                <option disabled>Loading authors...</option>
            )
        } else {
            return data.authors.map(q => {
                return (
                    <option key={q.id} value={q.id}>{q.name}</option>
                )
            })
        }
    }
    onSubmit(e) {
        e.preventDefault();
        this.props.addBookMutation({
            variables: {
                name: this.state.name,
                genre: this.state.genre,
                authorId: this.state.authorId   
            },
            refetchQueries: [{ query: getBooksQuery }]
        });
    }
    render() {
        return (
            <form id="add-book" onSubmit={(e) => this.onSubmit(e)}>
                <div className="field">
                    <label>Book Name:</label>    
                    <input type="text" onChange={(e) => this.setState({ name: e.target.value })} />
                </div>
                <div className="field">
                    <label>Genre:</label>    
                    <input type="text" onChange={(e) => this.setState({ genre: e.target.value })} />
                </div>
                <div className="field">
                    <label>Author:</label>
                    <select onChange={(e) => this.setState({ authorId: e.target.value })}>
                        <option>Select Author</option>
                        {this.displayAuthors()}
                    </select>
                </div>
                <button>+</button>
            </form>
        )
    }
}

export default compose(
    graphql(getAuthorsQuery, { name: "getAuthorsQuery" }),
    graphql(addBookMutation, { name: "addBookMutation" })
)(AddBook)