import React, { Component } from 'react';
import BookList from "./components/BookList";
import ApolloClient from "apollo-boost"
import { ApolloProvider } from "react-apollo";

const client = new ApolloClient({
  uri: "http://localhost:8081/graphql",
})

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <div className="main">
          <h1>Ralph Largo's Reading List</h1>
          <BookList/>
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
