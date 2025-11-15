import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

export const useTodos = () => {
  const [todos, setTodos] = useState([]);

  const addTodo = (todo) => {
    if (!todo.trim()) return;
    setTodos([
      ...todos,
      {
        id: uuidv4(),
        task: todo,
        completed: false,
        isEditing: false,
      },
    ]);
  };

  const toggleComplete = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const editTodo = (id, newValue, newDate) => {
    if (newValue === undefined) {
      // Caso: al hacer clic en el lápiz, solo activa el modo edición
      setTodos(
        todos.map((todo) =>
          todo.id === id 
            ? { ...todo, isEditing: !todo.isEditing } : todo
        )
      );
    } else {
      // Caso: cuando se envía el formulario de edición
      setTodos(
        todos.map((todo) =>
          todo.id === id 
            ? { ...todo, task: newValue, dueDate: newDate, isEditing: false } : todo
        )
      );
    }
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return { todos, addTodo, toggleComplete, editTodo, deleteTodo };
};
 