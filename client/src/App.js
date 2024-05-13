import { useEffect, useState } from "react";
import Todo from "./Todo";

function App() {
  const [todos, setTodos] = useState([]);
  const [content, setContent] = useState("");

  useEffect(() => {
    async function getTodos() {
      const res = await fetch("/api/todos");
      const todos = await res.json();

      setTodos(todos);
    }
    getTodos();
  }, []);
  const createNewTodo = async (e) => {
    e.preventDefault();
    if (content.length > 3) {
      const res = await fetch("/api/todos", {
        method: "POST",
        body: JSON.stringify({ todo: content }),
        headers: {
          "Content-type": "application/json",
        },
      });
      const newTodo = await res.json();

      setContent("");
      setTodos([...todos, newTodo]);
    }
  };

  return (
    <div className="main-container">
      <h4>To Do App</h4>

      <form className="input-container" onSubmit={createNewTodo}>
        <input
          type="text"
          name="input"
          id="task-input"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Enter a task here"
        />
        <button className="btn btn-save" type="submit">
          Save
        </button>
      </form>

      <table className="task-table">
        <tr className="task-table-row">
          <th className="">No.</th>
          <th className="">Todo item</th>
          <th className="">Status</th>
          <th className="">Action</th>
        </tr>
        <tbody className="task-table-body">
          {todos.length > 0 &&
            todos.map((todo) => (
              <Todo
                key={todo._id}
                todo={todo}
                todos={todos}
                setTodos={setTodos}
              />
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;


