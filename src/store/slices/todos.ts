import {StateCreator} from "zustand";

export type Todo = {userId: number, id: number, title: string, completed: boolean};

type TodosState = {
    todos: Todo[];
}

type TodosActions = {
    addTodos: (todos: Todo[]) => void;
}
export const createTodosSlice: StateCreator<TodosState & TodosActions, [], []> = (set) => ({
    todos: [],
    addTodos: (todos: Todo[]) => set(() => ({todos})),
})