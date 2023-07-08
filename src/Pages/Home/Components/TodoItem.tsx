/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useContext, useEffect, useState } from 'react';

import { useForm, SubmitHandler } from 'react-hook-form';
import { gql } from '@apollo/client';
import Spinner from '../../Loading/Spinner.tsx';
import { AuthContext } from '../../../main.tsx';

interface Todo {
  id: string,
  content: string,
  status: string,
}

type Inputs = {
    TodoInput: string;
  };

interface TodoItemProps {
  todoItem: {
    id: string,
    content: string,
    status: string,
  }
  setTodosArray: React.Dispatch<React.SetStateAction<Todo[]>>;
}

export default function TodoItem({
  todoItem, setTodosArray,
}: TodoItemProps) {
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isEditLoading, setIsEditLoading] = useState<boolean>(false);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  const {
    handleSubmit,
    register,
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async () => {
    setIsChecked(!isChecked);
  };

  const {
    client, token,
  } = useContext(AuthContext);

  const onSubmitEdit: SubmitHandler<Inputs> = async (data) => {
    try {
      console.log(data);
      console.log(todoItem);
      setIsEditLoading(true);
      const editTodo = gql`
      mutation updateTodo($id: ID!, $content: String!, $status: TodoStatus!) {
        updateTodo(todo: {id: $id, content: $content, status: $status}) {
          id
          content
          status
        }
      }
      `;
      await client.mutate({
        mutation: editTodo,
        variables: {
          id: todoItem.id,
          content: data.TodoInput,
          status: todoItem.status,
        },
        context: {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      });

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

      setTodosArray([...queryResponse.data.userTodos]);
      setIsEditLoading(false);
      setIsEditing(!isEditing);
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditClick = (e: any) => {
    e.preventDefault();
    if (!isEditing) {
      setIsEditing(true);
    } else if (isEditing) {
      handleSubmit(onSubmitEdit)();
    }
  };

  const onSubmitDone: SubmitHandler<Inputs> = async () => {
    try {
      // since state is not boolean, configure correct string for status
      // if todoItem.status is true, set status to DONE
      // if todoItem.status is false, set status to TODO
      // if todoItem.status is null, set status to TODO
      let status;
      if (todoItem.status === 'DONE') {
        status = 'TODO';
      } else if (todoItem.status === 'TODO') {
        status = 'DONE';
      }

      const doneTodo = gql`
      mutation updateTodo($id: ID!, $content: String!, $status: TodoStatus!) {
        updateTodo(todo: {id: $id, content: $content, status: $status}) {
          id
          content
          status
        }
      }
      `;
      await client.mutate({
        mutation: doneTodo,
        variables: {
          id: todoItem.id,
          content: todoItem.content,
          status,
        },
        context: {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      });

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

      setTodosArray([...queryResponse.data.userTodos]);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDoneClick = (e: any) => {
    e.preventDefault();
    handleSubmit(onSubmitDone)();
  };

  const onSubmitDelete: SubmitHandler<Inputs> = async () => {
    try {
      const deleteTodo = gql`
      mutation deleteTodo($id: ID!) {
        deleteTodo(id: $id)
      }
      `;
      await client.mutate({
        mutation: deleteTodo,
        variables: {
          id: todoItem.id,
        },
        context: {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      });

      // TODO: place this in a separate function
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

      setTodosArray([...queryResponse.data.userTodos]);
      setIsDeleting(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteClick = (e: any) => {
    e.preventDefault();
    setIsDeleting(true);
    handleSubmit(onSubmitDelete)();
  };

  // update todo status based on todoItem.status
  useEffect(() => {
    setIsChecked(todoItem.status === 'DONE');
  }, [todoItem]);

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit(onSubmitDone)}>
        <div className="flex flex-row bg-white w-full items-center p-3 m-0 rounded-lg box-border outline-none focus-within:border-[#DF2060] focus:outline-none gap-2">
          <div className="w-5">
            <button
              type="button"
              className={`select-none outline-none rounded-full border-2 border-[#DF2060] ${isChecked ? 'bg-[#DF2060] text-white' : 'bg-white text-white'} h-5 w-5 text-xs`}
              onClick={(e) => {
                handleDoneClick(e);
              }}
            >
              &#x2713;
            </button>
          </div>
          {/* Add CONDITIONAL STATE for Edit Functionality */}
          {isEditing ? (
            <input
              type="text"
              className={`border-0 outline-none w-full
              ${isEditLoading ? 'opacity-50' : ''}
              `}
              placeholder={todoItem.content}
              {...register('TodoInput', { required: true })}
            />
          ) : (
            <p
              className={`w-full select-none ${isChecked ? 'line-through text-[#86797D]' : ''}`}
            >
              {todoItem.content}
            </p>
          )}
          <button
            type="button"
            className={`text-[#86797D] hover:text-[#DF2060] select-none
            ${isEditing ? 'text-[#DF2060]' : ''}
            `}
            onClick={(e) => {
              handleEditClick(e);
            }}
          >
            {isEditLoading ? <Spinner /> : (isEditing ? 'Submit' : 'Edit')}
          </button>
          {/* This needs to be Remove when todoItem.status is 'DONE' */}
          {todoItem.status === 'TODO'
            ? (
              <button
                type="submit"
                className="text-[#86797D] hover:text-[#DF2060] select-none"
              >
                Done
              </button>
            )
            : ((
              isDeleting ? (
                <Spinner />
              ) : (
                <button
                  type="submit"
                  className="text-[#86797D] hover:text-[#DF2060] select-none"
                  onClick={(e) => {
                    handleDeleteClick(e);
                  }}
                >
                  Remove
                </button>
              )
            )

            )}

        </div>
      </form>
    </div>
  );
}
