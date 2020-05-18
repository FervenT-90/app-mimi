import 'typeface-oxanium';
import 'typeface-koho';
import './src/css/tailwind.css';

import React from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import fetch from 'isomorphic-fetch';

const client = new ApolloClient({
   fetch,
   uri: `${process.env.GATSBY_FAUNADB_URL}`,
   headers: {
      Authorization: `Bearer ${process.env.GATSBY_FAUNADB_API_KEY}`,
   },
});

// eslint-disable-next-line react/prop-types
export const wrapRootElement = ({ element }) => (
   <ApolloProvider client={client}>{element}</ApolloProvider>
);
