import React from 'react';
import TodoItem from '../Components/TodoItem.tsx';

interface Todo {
  id: string,
  content: string,
  status: string,
}

type TodoInputProps = {
    todosArray: Todo[];
  };

export default function TodoContainer({
  // eslint-disable-next-line no-unused-vars
  todosArray,
}: TodoInputProps) {
  return (
    <div
      className="flex flex-col bg-white w-full items-center
      p-3 px-0 border-1 border-white m-0 rounded-lg shadow-md box-border
      outline-none focus-within:border-[#DF2060]
      focus:outline-none gap-2 mt-3"
    >
      {todosArray.length > 0
        ? (todosArray.map((todo) => (
          <div key={todo.id} className="flex flex-col w-full">
            <TodoItem todoItem={todo} />
          </div>
        ))) : (
          <div className="flex flex-row justify-center text-center text-[#86797D] bg-white w-full items-center p-3 m-0 rounded-lg box-border outline-none focus-within:border-[#DF2060] focus:outline-none gap-2">
            You have no todo now.
            <br />
            Did you just get everything done?
          </div>
        )}
    </div>
  );
}
