/* eslint-disable import/extensions */
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
// eslint-disable-next-line import/no-unresolved
import './libraries/server'; // This does the magic
import App from './App.tsx';
import './index.css';
import Home from './Pages/Home/Home.tsx';

const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: 'http://localhost:5173/graphql',
});

const router = createBrowserRouter([
  {
    path: '/',
    element: <App client={client} />,
  },
  {
    path: '/home',
    element: <Home />,
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <div className="bg-[#dcd6d8] flex flex-col items-center w-screen h-screen">
        <div className="w-[480px] rounded-lg p-5">
          <RouterProvider router={router} />
        </div>
      </div>
    </ApolloProvider>
  </React.StrictMode>,
);
