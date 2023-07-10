/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/function-component-definition */
import React from 'react';

type InputEmailProps = {
  register: any;
  errors: any;
};

const InputEmail: React.FC<InputEmailProps> = ({ register, errors }) => (
  <>
    <div className="flex flex-row bg-white w-full items-center p-3
      border-1 border-white m-0 rounded-lg shadow-md box-border outline-none
      focus-within:border-[#DF2060] focus:outline-none gap-2"
    >
      <div className="flex flex-row justify-center items-center text-[#DF2060]">
        <button
          type="button"
          className="outline-none rounded-full border-2 border-[#DF2060] bg-white text-white h-5 w-5 text-xs"
        >
          &#x2713;
        </button>
      </div>
      <input
        type="text"
        className="border-0 outline-none w-full"
        placeholder="Email"
        {...register('Email', {
          required: 'Email is required',
          pattern: {
            value: /^\S+@\S+$/i,
            message: 'Invalid email format',
          },
        })}
      />
    </div>
    {errors.Email && <span>{errors.Email.message}</span>}
  </>
);

export default InputEmail;
