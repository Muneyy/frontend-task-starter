import React, { useEffect } from 'react';
import TodoItem from '../Components/TodoItem.tsx';

interface Todo {
  id: string,
  content: string,
  status: string,
}

type TodoInputProps = {
    todosArray: Todo[];
    setTodosArray: React.Dispatch<React.SetStateAction<Todo[]>>;
  };

export default function TodoContainer({
  // eslint-disable-next-line no-unused-vars
  todosArray, setTodosArray,
}: TodoInputProps) {
  const [pageNumber, setPageNumber] = React.useState<number>(0);
  const [arrayDisplay, setArrayDisplay] = React.useState<number[]>([1]);

  // function sliceArray(inputArray: number[]) {
  //   if (todosArray.length > 6) {
  //     if (pageNumber > todosArray.length - 5) {
  //       const slicedArray = inputArray.slice(todosArray.length - 5, todosArray.length);
  //       return slicedArray;
  //     }
  //   }
  //   const slicedArray = inputArray.slice(0, 5);

  //   return slicedArray;
  // }

  function sliceArray(inputArray: number[]) {
    const totalPages = Math.ceil(todosArray.length / 3);
    const startPage = Math.max(0, pageNumber - 5);
    const endPage = Math.min(startPage + 5, totalPages - 1);

    const slicedArray = inputArray.slice(startPage, endPage + 1);
    return slicedArray;
  }

  useEffect(() => {
    setArrayDisplay([...sliceArray([...Array(Math.ceil(todosArray.length / 3)).keys()])]);
  }, [todosArray]);

  useEffect(() => {
    console.log(pageNumber);
    console.log(arrayDisplay);
    if (pageNumber > arrayDisplay.length - 1) {
      setArrayDisplay([...sliceArray([...Array(Math.ceil(todosArray.length / 3)).keys()])]);
    } else if (pageNumber < arrayDisplay[0]) {
      setArrayDisplay([...sliceArray([...Array(Math.ceil(todosArray.length / 3)).keys()])]);
    }
    // setArrayDisplay([...sliceArray([...Array(Math.ceil(todosArray.length / 3)).keys()])]);
  }, [pageNumber]);

  return (
    <div
      className="flex flex-col bg-white w-full items-center
      p-3 px-0 border-1 border-white m-0 rounded-lg shadow-md box-border
      outline-none focus-within:border-[#DF2060]
      focus:outline-none gap-2 mt-3"
    >
      {todosArray.length > 0
        ? (todosArray
          .slice(pageNumber * 3, (pageNumber + 1) * 3)
          .filter((todo) => todo.status === 'TODO')
          .map((todo) => (
            <div key={todo.id} className="flex flex-col w-full">
              <TodoItem setTodosArray={setTodosArray} todoItem={todo} />
            </div>
          ))
        ) : (
          <div className="flex flex-row justify-center text-center text-[#86797D] bg-white w-full items-center p-3 m-0 rounded-lg box-border outline-none focus-within:border-[#DF2060] focus:outline-none gap-2">
            You have no todo now.
            <br />
            Did you just get everything done?
          </div>
        )}
      {todosArray.length > 3 ? (
        <div className="flex flex-row gap-3">
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              if (pageNumber > 0) {
                setPageNumber(pageNumber - 1);
              }
            }}
            className="
              rounded-lg w-10 h-10 text-[#86797D]
              hover:text-[#DF2060] hover:bg-[#DCD6D8]
              active:opacity-80
              "
          >
            {'<'}
          </button>
          {arrayDisplay
            // .slice(
            //   pageNumber,
            //   pageNumber + 1,
            // )
            .map((page) => (
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  setPageNumber(page);
                }}
                key={page}
                className={`
              ${pageNumber === page ? 'bg-[#DCD6D8] text-[#DF2060]' : ''}
              rounded-lg w-10 h-10 text-[#86797D]
              hover:text-[#DF2060] hover:bg-[#DCD6D8]
              active:opacity-80
              `}
              >
                {/* Display page number or any other content */}
                {page + 1}
              </button>
            ))}
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              if (pageNumber < Math.ceil(todosArray.length / 3) - 1) {
                setPageNumber(pageNumber + 1);
              }
            }}
            className="
              rounded-lg w-10 h-10 text-[#86797D]
              hover:text-[#DF2060] hover:bg-[#DCD6D8]
              active:opacity-80
              "
          >
            {'>'}
          </button>
        </div>
      ) : (
        null
      )}
    </div>
  );
}
