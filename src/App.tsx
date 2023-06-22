import React from 'react';
import { ApolloClient } from '@apollo/client';
import SignUpForm from './Pages/Auth/SignUpForm.tsx';

interface AppProps {
    client: ApolloClient<any>;
  }

function App({ client }: AppProps) {
  return (
    <>
      <div className="flex flex-row p-2 pl-0">
        <h3 className="text-xl font-bold text-[#0E0C0C]">
          Sign Up or Log in
        </h3>
      </div>
      <div className="flex flex-col">
        <SignUpForm client={client} />
      </div>
    </>
  );
}

export default App;
