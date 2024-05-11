export default function Todo(props) {
  const { todo, todos, setTodos } = props;

  const deleteTodo = async (todoId) => {
    const res = await fetch(`/api/todos/${todoId}`, {
      method: "DELETE",
    });

    const json = await res.json();
    if (json.acknowledged) {
      setTodos((currentTodos) => {
        return currentTodos.filter((currentTodo) => currentTodo._id !== todoId);
      });
    }
  };

  const updateTodo = async (todoId, todoStatus) => {
    const res = await fetch(`/api/todos/${todoId}`, {
      method: "PUT",
      body: JSON.stringify({ status: todoStatus }),
      headers: {
        "Content-type": "application/json",
      },
    });
    const json = await res.json();
    if (json.acknowledged) {
      setTodos((currentTodos) => {
        return currentTodos.map((currentTodo) => {
          if (currentTodo._id === todoId) {
            return { ...currentTodo, status: !currentTodo.status };
          }
          return currentTodo;
        });
      });
    }
  };

  return (
    <tr className="task-table-row">
      <th>{todos.indexOf(todo) + 1}</th>
      <td className="task-description">{todo.todo}</td>
      <td>{todo.status ? "Complete" : "In Progress"}</td>
      <td className="btn-container">
        <button className="btn btn-delete" onClick={() => deleteTodo(todo._id)}>
          Delete
        </button>
        <button
          className="btn btn-finished"
          onClick={() => updateTodo(todo._id, todo.status)}
        >
          Finished
        </button>
      </td>
    </tr>
  );
}
