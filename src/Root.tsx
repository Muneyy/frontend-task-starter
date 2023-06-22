import { gql, useMutation } from '@apollo/client';
import React, { useEffect } from 'react';

export default function Root() {
  // to log in, get a json web token
  // this account has been seeded to the database in advance
  const [getToken, { data }] = useMutation(gql`
    mutation Token {
      token(email: "test@skand.io", password: "testtest")
    }
  `);

  useEffect(() => {
    getToken();
  }, [getToken]);

  // simply show the token for now
  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <>{data?.token}</>;
}
