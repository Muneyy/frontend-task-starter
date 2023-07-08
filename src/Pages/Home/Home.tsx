import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TodoInput from './TodoInput.tsx';
import { AuthContext } from '../../main.tsx';
import TodoContainer from './TodoContainer/TodoContainer.tsx';

interface Todo {
  id: string,
  content: string,
  status: string,
}

export default function Home() {
  const {
    user,
  } = useContext(AuthContext);

  const [todosArray, setTodosArray] = useState<Todo[]>([]);

  // Redirect user if they are not logged into the site
  const navigate = useNavigate();
  useEffect(() => {
    if (!user) {
      navigate('/');
    }
  });

  // useEffect(() => {
  //   const sortedTodosArray = [...todosArray].sort((a, b) => {
  //     if (a.status === 'TODO' && b.status === 'DONE') {
  //       return -1; // a comes before b
  //     } if (a.status === 'DONE' && b.status === 'TODO') {
  //       return 1; // a comes after b
  //     }
  //     return 0; // maintain the current order
  //   });

  //   setTodosArray(sortedTodosArray);
  // }, [todosArray]);

  return (
    <>
      <div className="flex flex-row p-2 pl-0">
        <h3 className="text-xl font-bold text-[#0E0C0C]">
          My Todos
          {user && `, Welcome ${user}`}
        </h3>
      </div>
      <TodoInput setTodosArray={setTodosArray} />
      <TodoContainer todosArray={todosArray} setTodosArray={setTodosArray} />
    </>
  );
}
