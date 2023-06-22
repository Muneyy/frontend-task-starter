/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';

import { useForm, SubmitHandler } from 'react-hook-form';

type Inputs = {
    TodoInput: string;
  };

interface TodoItemProps {
  todoItem: {
    id: string,
    content: string,
    status: string,
  }
}

export default function TodoItem({
  todoItem,
}: TodoItemProps) {
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const {
    register, handleSubmit,
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    console.log(todoItem);
    setIsChecked(!isChecked);
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-row bg-white w-full items-center p-3 m-0 rounded-lg box-border outline-none focus-within:border-[#DF2060] focus:outline-none gap-2">
          <div className="w-5">
            <button
              type="button"
              className={`select-none outline-none rounded-full border-2 border-[#DF2060] ${isChecked ? 'bg-[#DF2060] text-white' : 'bg-white text-white'} h-5 w-5 text-xs`}
              onClick={(e) => {
                e.preventDefault();
                setIsChecked(!isChecked);
              }}
            >
              &#x2713;
            </button>
          </div>
          {/* Add CONDITIONAL STATE for Edit Functionality */}
          {/* <input
            type="text"
            className="border-0 outline-none w-full"
            placeholder="Sample Todo"
            {...register('TodoInput', { required: true })}
          /> */}
          <p
            className={`w-full select-none ${isChecked ? 'line-through text-[#86797D]' : ''}`}
          >
            {todoItem.content}
          </p>
          <button
            type="submit"
            className="text-[#86797D] hover:text-[#DF2060] select-none"
          >
            Done
          </button>
        </div>
      </form>
    </div>
  );
}
