/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/function-component-definition */
import React from 'react';

type InputPasswordProps = {
  register: any;
  errors: any;
};

const InputPassword: React.FC<InputPasswordProps> = ({ register, errors }) => (
  <>
    <div className="flex flex-row bg-white w-full items-center p-3
      border-1 border-white m-0 rounded-lg shadow-md box-border outline-none
      focus-within:border-[#DF2060] focus:outline-none gap-2"
    >
      <div className="w-5">
        <button
          type="button"
          className="outline-none rounded-full border-2 border-[#DF2060] bg-white text-white h-5 w-5 text-xs"
        >
          &#x2713;
        </button>
      </div>
      <input
        type="password"
        className="border-0 outline-none w-full"
        placeholder="Password"
        {...register('Password', {
          required: 'Password is required',
          minLength: {
            value: 8,
            message: 'Password must be at least 8 characters',
          },
        })}
      />
    </div>
    {errors.Password && <span>{errors.Password.message}</span>}
  </>
);

export default InputPassword;
