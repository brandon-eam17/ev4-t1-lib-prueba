import React, { useEffect, useRef, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"

export const TodoForm = ({ addTodo, inputRef }) => {
  const [value, setValue] = useState("");
  const [dueDate, setDueDate] = useState(null);

  const localRef = useRef(null);

  const refToUse = inputRef || localRef;

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedValue = value.trim();

    if (trimmedValue) {
      const finalDate = dueDate || new Date();
      addTodo(value, finalDate);
      setValue("");
      setDueDate(null);
      refToUse.current?.focus();
    }
  };

  useEffect(() => {
    refToUse.current?.focus();
  }, []);

  return (
    <form className="TodoForm" onSubmit={handleSubmit}>
      <input
        type="text"
        className="todo-input"
        value={value}
        placeholder="Nueva Tarea"
        onChange={(e) => setValue(e.target.value)}
        ref={refToUse}
      ></input>
      <DatePicker
        selected={dueDate}
        onChange={(date) => setDueDate(date)}
        placeholderText="Fecha de vencimiento"
        dateFormat="dd/MM/yyyy"
        className="todo-input"
      ></DatePicker>
      <button type="submit" className="todo-btn" disabled={!value.trim()}>
        Agregar Tarea
      </button>
    </form>
  );
};
 