import React from 'react';
import TodoInput from './Components/TodoInput.tsx';

export default function Home() {
  return (
    <>
      <div className="flex flex-row p-2 pl-0">
        <h3 className="text-xl font-bold text-[#0E0C0C]">
          My Todos
        </h3>
      </div>
      <TodoInput />
    </>
  );
}
