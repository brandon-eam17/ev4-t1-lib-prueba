import { TodoForm } from "./TodoForm.jsx";
import { Todo } from "./Todo.jsx";
import { EditTodoForm } from "./EditTodoForm.jsx";
import { useTodos } from "../hooks/useTodos.js";
import { useState } from "react";
import _ from "lodash";

export const TodoWrapper = () => {
  const { todos, addTodo, toggleComplete, editTodo, deleteTodo } = useTodos();
  const [sortOption, setSortOption] = useState("fecha");

  const getSortedTodos = () => {
    switch (sortOption) {
      case "alfabetico":
        return _.orderBy(todos,["task"], ["asc"]);
      case "estado":
        return _.orderBy(todos,["completed"], ["asc"]);
      case "fecha":
      default:  
        return _.orderBy(todos, [(todo) => new Date(todo.dueDate || 0)], 
        ["asc"]
      ); 
    }
  };

  const sortedTodos = getSortedTodos();

  return (
    <div className="TodoWrapper">
      <h1>Lista de cosas por hacer</h1>
      <div className="sort-section">
        <label htmlFor="sort"> Ordenar por:</label>
        <select 
          id="sort" 
          className="sort-select" 
          value={sortOption} 
          onChange={(e) => setSortOption(e.target.value)}
        >
          <option value="fecha">Fecha</option>
          <option value="alfabetico">Alfabético</option>
          <option value="estado">Estado</option>      
        </select>
      </div>

      <TodoForm addTodo={addTodo} />
      {sortedTodos.map((todo) =>
        todo.isEditing ? (
          <EditTodoForm key={todo.id} editTodo={editTodo} task={todo} />
        ) : (
          <Todo
            key={todo.id}
            task={todo}
            toggleComplete={toggleComplete}
            deleteTodo={deleteTodo}
            editTodo={editTodo}
          />
        )
      )}
    </div>
  );
};