import { useState, useEffect } from 'react';

interface Todo {
  id: number;
  text: string;
}

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState<string>('');

  useEffect(() => {
    // Cargar datos desde Local Storage al iniciar la aplicación
    const storedTodos = localStorage.getItem('todos');
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []);

  useEffect(() => {
    // Guardar datos en Local Storage cuando cambian
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const handleAddTodo = () => {
    if (newTodo.trim() === '') return;

    const newId = todos.length === 0 ? 1 : todos[todos.length - 1].id + 1;
    const newTodos = [...todos, { id: newId, text: newTodo }];
    setTodos(newTodos);
    setNewTodo('');
  };

  const handleDeleteTodo = (id: number) => {
    const filteredTodos = todos.filter((todo) => todo.id !== id);
    setTodos(filteredTodos);
  };


  if (window.localStorage) {
    // El navegador admite el Local Storage
    // Puedes usar localStorage para almacenar y recuperar datos
    
    // El navegador no admite el Local Storage
    // Debes manejar esta situación de manera adecuada
    console.log('El navegador no admite el Local Storage');
  }

  return (
    <div>
      <h1>CRUD App with Local Storage</h1>
      <input
        type="text"
        placeholder="Enter a new todo"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
      />
      <button onClick={handleAddTodo}>Add</button>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            {todo.text}
            <button onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
