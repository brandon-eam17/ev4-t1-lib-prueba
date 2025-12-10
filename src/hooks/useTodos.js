import { useState } from "react";
import { api } from "../api/axiosConfig.js";

export const useTodos = () => {
  const [todos, setTodos] = useState([]);

  // ─── Obtener todos ───
  const fetchTodos = async () => {
    try {
      const response = await api.get("/todos/");
      setTodos(response.data);
    } catch (error) {
      console.error(
        "Error al obtener todos:",
        error.response?.data || error.message
      );
    }
  };

  // ─── Agregar un todo ───
  const addTodo = async (task, dueDate) => {
    if (!task.trim()) return;

    try {
      const formattedDate = dueDate
        ? new Date(dueDate).toISOString().split("T")[0]
        : null;

      const response = await api.post("/todos/", {
        task,
        completed: false,
        isEditing: false,
        dueDate: formattedDate,
      });

      setTodos([...todos, response.data]);
    } catch (error) {
      console.error(
        "Error al agregar el todo:",
        error.response?.data || error.message
      );
    }
  };

  // ─── Editar un todo ───
  const editTodo = async (id, newValue, newDate) => {
    try {
      const formattedDate = newDate
        ? new Date(newDate).toISOString().split("T")[0]
        : null;

      if (newValue !== undefined) {
        const todo = todos.find((t) => t.id === id);

        const response = await api.put(`/todos/${id}/`, {
          task: newValue,
          dueDate: formattedDate,
          completed: todo.completed,
          isEditing: false,
        });

        setTodos(todos.map((t) => (t.id === id ? response.data : t)));
      } else {
        // Solo alternar isEditing en frontend
        setTodos(
          todos.map((t) =>
            t.id === id ? { ...t, isEditing: !t.isEditing } : t
          )
        );
      }
    } catch (error) {
      console.error(
        "Error al editar el todo:",
        error.response?.data || error.message
      );
    }
  };

  // ─── Alternar completado ───
  const toggleComplete = async (id) => {
    try {
      const todo = todos.find((t) => t.id === id);
      const response = await api.put(`/todos/${id}/`, {
        ...todo,
        completed: !todo.completed,
      });

      setTodos(todos.map((t) => (t.id === id ? response.data : t)));
    } catch (error) {
      console.error(
        "Error al cambiar estado:",
        error.response?.data || error.message
      );
    }
  };

  // ─── Eliminar un todo ───
  const deleteTodo = async (id) => {
    try {
      await api.delete(`/todos/${id}/`);
      setTodos(todos.filter((t) => t.id !== id));
    } catch (error) {
      console.error(
        "Error al eliminar el todo:",
        error.response?.data || error.message
      );
    }
  };

  return { todos, fetchTodos, addTodo, editTodo, toggleComplete, deleteTodo };
};
 