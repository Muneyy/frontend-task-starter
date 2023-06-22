/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/function-component-definition */
import React, { useState } from 'react';

type FormInputProps = {
    register: any;
    errors: any;
    placeholderText: string;
  };

const FormInput: React.FC<FormInputProps> = ({ register, errors, placeholderText }) => {
  const [isChecked, setIsChecked] = useState<boolean>(false);

  return (
    <>
      <div className="flex flex-row bg-white w-full items-center p-3
      border-1 border-white m-0 rounded-lg shadow-md box-border outline-none
      focus-within:border-[#DF2060] focus:outline-none gap-2"
      >
        <div className="w-5">
          <button
            type="button"
            className={`outline-none rounded-full border-2 border-[#DF2060]
            ${isChecked ? 'bg-[#DF2060] text-white' : 'bg-white text-white'}
            h-5 w-5 text-xs`}
            onClick={(e) => {
              e.preventDefault();
              setIsChecked(!isChecked);
            }}
          >
            &#x2713;
          </button>
        </div>
        <input
          type={placeholderText === 'Password' ? 'password' : 'text'}
          className="border-0 outline-none w-full"
          placeholder={`${placeholderText}`}
          {...register(`${placeholderText}`, { required: true, minLength: 8 })}
        />
      </div>
      {errors.Password && (
        <span>
          {placeholderText}
          {' '}
          required
        </span>
      )}
    </>
  );
};

export default FormInput;
