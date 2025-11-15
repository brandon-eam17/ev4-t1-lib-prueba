import React, { useState, useEffect, useRef } from "react";
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css";

export const EditTodoForm = ({ editTodo, task }) => {
  const [value, setValue] = useState(task.task || "");
  const [date, setDate] = useState(
    task.dueDate ? new Date(task.dueDate) : null
  );
  
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    setValue(task.task || "");
  }, [task]);

  useEffect(() => {
    setValue(task.dueDate ? new Date (task.dueDate) : null);
  }, [task]);  

  const handleSubmit = (e) => {
    e.preventDefault();
    editTodo(task.id, value, date);
  };

  return (
    <form className="TodoForm" onSubmit={handleSubmit}>
      <input
        type="text"
        className="todo-input"
        value={value}
        placeholder="Update Task"
        onChange={(e) => setValue(e.target.value)}
        ref={inputRef}
      ></input>
      <DatePicker
        selected={date}
        onChange={(date) => setDate(date)}
        placeholderText="Selecciona nueva fecha"
        dateFormat="dd/MM/yyyy"
        className="todo-input"
      ></DatePicker>
      <button type="submit" className="todo-btn">
        Update Task
      </button>
    </form>
  );
};

 