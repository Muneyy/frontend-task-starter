/* eslint-disable react/jsx-props-no-spreading */
import { gql } from '@apollo/client';
import React, { useContext, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { AuthContext } from '../../main.tsx';
import Spinner from '../Loading/Spinner.tsx';

type Inputs = {
  TodoInput: string;
};

interface Todo {
  id: string,
  content: string,
  status: string,
}

type TodoInputProps = {
  setTodosArray: React.Dispatch<React.SetStateAction<Todo[]>>;
};

export default function TodoInput({
  // eslint-disable-next-line no-unused-vars
  setTodosArray,
}: TodoInputProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const {
    client, token,
  } = useContext(AuthContext);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    console.log(data);

    setIsLoading(true);

    try {
      const createTodo = gql`
      mutation createTodo($content: String!){
        createTodo(content: $content){
          content
        }
      }
      `;

      const response = await client.mutate({
        mutation: createTodo,
        variables: {
          content: data.TodoInput,
        },
        context: {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      });

      console.log(response);

      const userTodos = gql`
      query userTodos {
        userTodos {
          id
          content
          status
        }
      }
      `;

      const queryResponse = await client.query({
        query: userTodos,
        context: {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
        fetchPolicy: 'network-only',
      });

      console.log('query Response');
      console.log(queryResponse);
      setTodosArray([...queryResponse.data.userTodos]);
    } catch (e) {
      console.log(e);
    }

    setIsLoading(false);
  };

  return (
    <div className="flex flex-col gap-2">
      <form>
        <div
          className="flex flex-row bg-white w-full items-center
        p-3 border-1 border-white m-0 rounded-lg shadow-md box-border
        outline-none focus-within:border-[#DF2060]
        focus:outline-none gap-2"
        >
          <div className="w-5">
            <button
              type="button"
              className={`outline-none rounded-full border-2 border-[#DF2060]
              bg-white text-white
              h-5 w-5 text-xs`}
              // onClick={(e) => {
              //   e.preventDefault();
              //   setIsChecked(!isChecked);
              // }}
            >
              &#x2713;
            </button>
          </div>
          <input
            type="text"
            className="border-0 outline-none w-full"
            placeholder="Create a todo..."
            {...register('TodoInput', { required: true })}
          />
        </div>
        {/* No errors so this does not show up */}
        {errors.TodoInput && <span />}
      </form>
      <div className="flex flex-row w-full justify-between gap-2">
        <div className="flex flex-row bg-white w-full items-center justify-between p-3 border-1 border-white
        m-0 rounded-lg shadow-md box-border outline-none
        focus-within:border-[#DF2060] focus:outline-none gap-2"
        >
          <div className="w-5">
            <button
              type="button"
              className={`outline-none rounded-full border-2 border-[#DF2060]
              bg-white text-white
              h-5 w-5 text-xs`}
              // onClick={(e) => {
              //   e.preventDefault();
              //   setIsChecked(!isChecked);
              // }}
            >
              &#x2713;
            </button>
          </div>
          <input
            type="text"
            className="border-0 outline-none w-full"
            placeholder="search todos..."
          />
        </div>
        <button
          className="w-[100px] rounded-xl shadow-md bg-[#F3F1F2] p-3
          text-black font-medium select-none
          hover:text-[#DF2060] active:opacity-80"
          onClick={(e) => {
            e.preventDefault();
          }}
          type="button"
        >
          Search
        </button>
        <button
          className={`w-[100px] rounded-xl shadow-md bg-[#DF2060] p-3
          text-[#F3F1F2] font-medium select-none
          hover:opacity-90 active:opacity-80
          `}
          onClick={handleSubmit(onSubmit)}
          type="button"
          disabled={isLoading}
        >
          {isLoading ? <Spinner />
            : 'Create'}
        </button>
      </div>
    </div>
  );
}
