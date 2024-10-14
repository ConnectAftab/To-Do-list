import React, { useState } from 'react';
import './Todo.css';

const Todo = () => {
  const [todos, setTodos] = useState([]);

  const [inputValue, setInputValue] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);
  const [editValue, setEditValue] = useState('');
  const addTodo = () => {
    if (inputValue.trim() !== '') {
      const newTodo = {
        id: new Date().getTime(),
        text: inputValue,
      };
      setTodos([...todos, newTodo]);
      setInputValue('');
    }
  };
  const deleteTodo = (id) => {
    const updatedTodo = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodo);
  };
  const enterEditMode = (id, text) => {
    setEditMode(true);
    setEditId(id);
    setEditValue(text);
  };
  const updateTodo = () => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === editId) {
        return { ...todo, text: editValue };
      }
      return todo;
    });
    setTodos(updatedTodos);
    setEditMode(false);
    setEditId(null);
    setEditValue('');
  };
  return (
    <div className="todo-container">
      <h2>ToDo List</h2>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      {editMode ? (
        <div>
          <input
            type="text"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
          />
          <button className="btn" onClick={updateTodo}>
            Update
          </button>
        </div>
      ) : (
        <button className="btn" onClick={addTodo}>
          Add
        </button>
      )}

      <ul>
        {todos.map((todo) => (
          <li className="list" key={todo.id}>
            {todo.text}{' '}<div>
            <button className="btn" onClick={() => deleteTodo(todo.id)}>
              Delete
            </button>
            <button
              className="btn"
              onClick={() => enterEditMode(todo.id, todo.text)}
            >
              Edit
            </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Todo;
