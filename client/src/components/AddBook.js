import React, { Component  } from 'react';
import { graphql } from "react-apollo";
import { getAuthorsQuery } from "../queries/queries";

class AddBook extends Component { 
    displayAuthors() {
        const { data } = this.props;
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
    render() {
        console.log(this.props);
        return (
            <form id="add-book">
                <div className="field">
                    <label>Book Name:</label>    
                    <input type="text" />
                </div>
                <div className="field">
                    <label>Genre:</label>    
                    <input type="text" />
                </div>
                <div className="field">
                    <label>Author:</label>
                    <select>
                        <option>Select Author</option>
                        {this.displayAuthors()}
                    </select>
                </div>
                <button>+</button>
            </form>
        )
    }
}

export default graphql(getAuthorsQuery)(AddBook)