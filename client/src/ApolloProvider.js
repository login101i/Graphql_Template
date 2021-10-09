import React from "react";
import App from "./App";


import { InMemoryCache } from "apollo-cache-inmemory";
// Nie próbuj apolloboost, są problemy z authentification po stronie servera

import { createHttpLink } from "apollo-link-http";
import { ApolloProvider } from "@apollo/react-hooks";
import { setContext } from "apollo-link-context";


const authLink = setContext(() => {
  const token = localStorage.getItem("jwtToken");
  return {
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const httpLink = createHttpLink({
  uri: "http://localhost:5000",
});


const client = new ApolloClient({
  link: authLink.concat(httpLink),
  //? a co to za concat tutaj? :))  it merges authorizationHeader and provides it always if it is
  cache: new InMemoryCache(),
});

export default (
    <ApolloProvider client={client}>
        <App/>
    </ApolloProvider>
)