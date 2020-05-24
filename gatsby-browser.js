import 'typeface-oxanium';
import 'typeface-koho';
import './src/css/tailwind.css';

import React from 'react';
import { ApolloProvider } from '@apollo/react-hooks';
import { apolloService } from './src/services/apolloService.ts';

// eslint-disable-next-line react/prop-types
export const wrapRootElement = ({ element }) => (
   <ApolloProvider client={apolloService.client}>{element}</ApolloProvider>
);
