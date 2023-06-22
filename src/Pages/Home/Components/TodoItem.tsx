/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';

import { useForm, SubmitHandler } from 'react-hook-form';

type Inputs = {
    TodoInput: string;
  };

export default function TodoItem() {
  const {
    register, handleSubmit, formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    console.log(data);
  };

  const [isChecked, setIsChecked] = useState<boolean>(false);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-row bg-white w-full items-center p-3 border-1 border-white m-0 rounded-lg shadow-md box-border outline-none focus-within:border-[#DF2060] focus:outline-none gap-2">
        <button
          type="button"
          className={`outline-none rounded-full border-2 border-[#DF2060] ${isChecked ? 'bg-[#DF2060] text-white' : 'bg-white text-white'} h-5 w-5 text-xs`}
          onClick={(e) => {
            e.preventDefault();
            setIsChecked(!isChecked);
          }}
        >
          &#x2713;
        </button>
        <input
          type="text"
          className="border-0 outline-none w-full"
          placeholder="Create a todo..."
          {...register('TodoInput', { required: true })}
        />
      </div>
      {/* Nothing in here */}
      {errors.TodoInput && <span />}
    </form>
  );
}
