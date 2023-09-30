import {useEffect} from "react";

import {useStore} from "./store/store.ts";
import useFetch from "./hooks/useFetch.ts";

import {Todo} from "./store/slices/todos.ts";

import './App.css'

function App() {
    const {data, isLoading} = useFetch<Todo>('https://jsonplaceholder.typicode.com/todos');

    const addTodos = useStore.use.addTodos();
    const todos = useStore.use.todos();

    useEffect(() => {
        if (data) {
            addTodos(data);
        }
    }, [data]);

    return (
      <>
          <header>
              <p className='logo'>Use of zustand store</p>
          </header>
          <main>
              {
                  isLoading
                      ? <MainContendWithOutTodos />
                      : todos.map(({title}) => <p>{title}</p>)
              }
          </main>
          <footer />
      </>
    )
}

function MainContendWithOutTodos() {
    const counter = useStore.use.counter()
    const {decreaseCounter, increaseCounter, clearCounter} = useStore((state) => state);

    return (
        <>
            <p>Counter: {counter}</p>
            <button onClick={increaseCounter}>+</button>
            <button onClick={decreaseCounter}>-</button>
            <button onClick={clearCounter}>clear</button>
        </>
    );
}

export default App
