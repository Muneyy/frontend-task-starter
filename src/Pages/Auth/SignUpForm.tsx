import React, { useContext, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { ApolloClient, gql } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../main.tsx';
import Spinner from '../Loading/Spinner.tsx';
import InputEmail from './Components/InputEmail.tsx';
import InputPassword from './Components/InputPassword.tsx';

type Inputs = {
  Email: string;
  Password: string;
};

interface AppProps {
  client: ApolloClient<any>;
}

export default function SignUpForm({ client }: AppProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const [isLoadingLogIn, setIsLoadingLogIn] = useState<boolean>(false);
  const [isLoadingSignUp, setIsLoadingSignUp] = useState<boolean>(false);

  // Submit Form
  // Handle Sign up and Log in functionalities
  const handleSignUpSubmit: SubmitHandler<Inputs> = async (data) => {
    console.log(data);
    setIsLoadingSignUp(true);
    try {
      const createUserMutation = gql`
        mutation createUser($email: String!, $password: String!) {
          createUser(email: $email, password: $password) {
            email
            passwordHashed
          }
        }
      `;

      const response = await client.mutate({
        mutation: createUserMutation,
        variables: {
          email: data.Email,
          password: data.Password,
        },
      });

      console.log(response);
    } catch (e) {
      console.log(e);
    }
    setIsLoadingSignUp(false);
  };

  const {
    setToken, setUser,
  } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleLogInSubmit: SubmitHandler<Inputs> = async (data) => {
    console.log(data);
    // Log in User using gql mutation
    setIsLoadingLogIn(true);
    try {
      const logInUser = gql`
        mutation LogInUser($email: String!, $password: String!) {
          token(email: $email, password: $password)
        }
      `;
      const response = await client.mutate({
        mutation: logInUser,
        variables: {
          email: data.Email,
          password: data.Password,
        },
      });

      console.log(response);
      setToken(response.data.token);
      setUser(data.Email);
      navigate('/home');
    } catch (e) {
      console.log(e);
    }
    setIsLoadingLogIn(false);
  };

  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <div className="flex flex-col">
      <form>
        <div className="flex flex-col gap-2">
          <InputEmail
            register={register}
            errors={errors}
          />
          <InputPassword
            register={register}
            errors={errors}
          />
          <div className="flex flex-row gap-3 justify-end">
            <button
              className="w-[90px] rounded-xl shadow-md bg-[#F3F1F2] p-3 text-black font-medium hover:text-[#DF2060] active:opacity-80"
              onClick={handleSubmit(handleLogInSubmit)}
              type="button"
              disabled={isLoadingLogIn}
            >
              {isLoadingLogIn ? <Spinner /> : 'Log in'}

            </button>
            <button
              className="w-[90px] rounded-xl shadow-md bg-[#DF2060] p-3 text-[#F3F1F2] font-medium hover:opacity-80 active:opacity-90"
              onClick={handleSubmit(handleSignUpSubmit)}
              type="button"
              disabled={isLoadingSignUp}
            >
              {isLoadingSignUp ? <Spinner /> : 'Sign up'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
