/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable import/extensions */
import {
  ApolloClient, ApolloProvider, InMemoryCache, NormalizedCacheObject,
} from '@apollo/client';
import React, {
  createContext, useMemo, useState, Dispatch,
} from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
// eslint-disable-next-line import/no-unresolved
import './libraries/server'; // This does the magic
import App from './App.tsx';
import './index.css';
import Home from './Pages/Home/Home.tsx';

type User = any;

// Define the type for the context value
interface AuthContextValue {
  token: string | null;
  user: User | null;
  setToken: Dispatch<string | null>;
  setUser: Dispatch<User | null>;
  client: ApolloClient<NormalizedCacheObject>,
}

const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: '/graphql',
});

// eslint-disable-next-line import/prefer-default-export
export const AuthContext = createContext<AuthContextValue>({
  token: null,
  user: null,
  setToken: () => {},
  setUser: () => {},
  client,
});

function AuthProvider({ children }: any) {
  const [token, setToken] = useState<string>('');
  const [user, setUser] = useState<string>('');

  // Memoize the context value object to avoid unnecessary re-renders
  const contextValue = useMemo<any>(
    () => ({
      token,
      user,
      setToken,
      setUser,
      client,
    }),
    [token, user],
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}

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
    <AuthProvider>
      <ApolloProvider client={client}>
        <div className="bg-[#dcd6d8] flex flex-col items-center w-screen h-screen">
          <div className="w-[480px] rounded-lg p-5">
            <RouterProvider router={router} />
          </div>
        </div>
      </ApolloProvider>
    </AuthProvider>
  </React.StrictMode>,
);
