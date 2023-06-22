import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { ApolloClient, gql } from '@apollo/client';
import FormInput from './Components/FormInput.tsx';

type Inputs = {
  Email: string,
  Password: string,
};

interface AppProps {
    client: ApolloClient<any>;
  }

export default function SignUpForm({ client }: AppProps) {
  const {
    register, handleSubmit, formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    console.log(data);

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
  };

  return (
  /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <div className="flex flex-col">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-2">
          <FormInput register={register} errors={errors} placeholderText="Email" />
          <FormInput register={register} errors={errors} placeholderText="Password" />
          <div className="flex flex-row gap-3 justify-end">
            {/* <input type="submit" /> */}
            <button
              className="w-[90px] rounded-xl shadow-md bg-[#F3F1F2] p-3 text-black font-medium hover:text-[#DF2060] active:opacity-80"
              onClick={handleSubmit(onSubmit)}
              type="button"
            >
              Log in
            </button>
            <button
              className="w-[90px] rounded-xl shadow-md bg-[#DF2060] p-3 text-[#F3F1F2] font-medium hover:opacity-80 active:opacity-80"
              onClick={handleSubmit(onSubmit)}
              type="button"
            >
              Sign up
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}