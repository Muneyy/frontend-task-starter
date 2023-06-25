import React, { useContext, useState } from 'react';
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
  // const navigate = useNavigate();
  // useEffect(() => {
  //   if (!user) {
  //     navigate('/');
  //   }
  // });

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
