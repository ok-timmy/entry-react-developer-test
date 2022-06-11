import React from 'react';
// import ReactDOM from 'react-dom';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
} from "@apollo/client";
import { Provider } from 'react-redux';
import store from './Components/Store/index'


const container = document.getElementById('root');
const root = createRoot(container);

const client = new ApolloClient({
  uri: 'http://localhost:4000',
  cache: new InMemoryCache()
});

root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <Provider store={store}>
    <App />
    </Provider>
    </ApolloProvider>
  </React.StrictMode>
);

