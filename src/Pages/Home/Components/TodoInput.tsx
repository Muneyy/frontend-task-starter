/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

type Inputs = {
  TodoInput: string;
};

export default function TodoInput() {
  const {
    register, handleSubmit, formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    console.log(data);
  };

  // const [isChecked, setIsChecked] = useState<boolean>(false);

  return (
    <div className="flex flex-col gap-3">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-row bg-white w-full items-center
        p-3 border-1 border-white m-0 rounded-lg shadow-md box-border
        outline-none focus-within:border-[#DF2060]
        focus:outline-none gap-2"
        >
          <button
            type="button"
            className={`outline-none rounded-full border-2 border-[#DF2060] 
            'bg-white text-white'
            h-5 w-5 text-xs`}
            // onClick={(e) => {
            //   e.preventDefault();
            //   setIsChecked(!isChecked);
            // }}
          >
            {/* &#x2713; */}
          </button>
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
        <div className="flex flex-row bg-white w-7/12 items-center p-3 border-1 border-white m-0 rounded-lg shadow-md box-border outline-none focus-within:border-[#DF2060] focus:outline-none gap-2">
          <button
            type="button"
            className={`outline-none rounded-full border-2 border-[#DF2060] 
            'bg-white text-white border-[#DF2060]'} h-5 w-5 text-xs`}
            // onClick={(e) => {
            //   e.preventDefault();
            //   setIsChecked(!isChecked);
            // }}
          >
            &#x2713;
          </button>
          <input
            type="text"
            className="border-0 outline-none w-full"
            placeholder="search todos..."
          />
        </div>
        <button
          className="w-[90px] rounded-xl shadow-md bg-[#F3F1F2] p-3 text-black font-medium hover:text-[#DF2060] active:opacity-80"
          onClick={handleSubmit(onSubmit)}
          type="button"
        >
          Search
        </button>
        <button
          className="w-[90px] rounded-xl shadow-md bg-[#DF2060] p-3 text-[#F3F1F2] font-medium hover:opacity-80 active:opacity-80"
          onClick={handleSubmit(onSubmit)}
          type="button"
        >
          Create
        </button>
      </div>
    </div>
  );
}
