import { action, Action } from "easy-peasy";

// Define the TypeScript type for the state
export interface Todo {
  text: string;
}

export interface TodoModel {
  todos: any;
  addTodo:  Action<TodoModel, Todo>;
}

// Create the store
export const todoModel: TodoModel = {
  todos: [
    { text: "Learn React" },
    { text: "Practice TypeScript" },
    { text: "Build a project with Easy Peasy" }
  ],
  addTodo: action<TodoModel, Todo>((state, todo) => {
    state.todos.push(todo);
  }),
};
