import { useState } from "react";
import {
  useGetTodosQuery,
  useUpdateTodoMutation,
  useDeleteTodoMutation,
  useAddTodoMutation,
} from "../../features/api/apiSlice";

const Todo = () => {
  const [newTodo, setNewTodo] = useState("");

  const {
    data: todos,
    isLoading,
    isFetching,
    isError,
    error,
    isSuccess,
  } = useGetTodosQuery();
  const [addTodo, { isLoading: isAddLoading }] = useAddTodoMutation();
  const [updateTodo, { isLoading: isUpdateLoading }] = useUpdateTodoMutation();
  const [deleteTodo, { isLoading: isDeleteLoading }] = useDeleteTodoMutation();

  const handleSubmit = (e) => {
    e.preventDefault();
    addTodo({ userId: 1, title: newTodo, completed: false });
    setNewTodo("");
  };

  const newItemSection = (
    <form onSubmit={handleSubmit} style={{ display: "flex" }}>
      <label htmlFor="new-todo">Enter a new todo item</label>
      <div className="new-todo">
        <input
          type="text"
          id="new-todo"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Enter new todo"
        />
      </div>
      <button className="submit">
        {isAddLoading ? "Loading..." : "Upload"}
      </button>
    </form>
  );

  let content;
  if (isFetching) {
    content = <p>Loading...</p>;
  } else if (isSuccess) {
    content = (
      <table>
        <thead>
          <tr>
            <th>Task</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {todos.map((todo) => (
            <tr key={todo.id}>
              <td
                style={{
                  textDecoration: todo.completed ? "line-through" : "none",
                }}
              >
                {todo.title}
              </td>
              <td>
                <button
                  onClick={() =>
                    updateTodo({ ...todo, completed: !todo.completed })
                  }
                >
                  {todo.completed ? "Incomplete" : "Completed"}
                </button>
                <button onClick={() => deleteTodo({ id: todo.id })}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  } else if (isError) {
    content = <p>{error}</p>;
  }

  return (
    <main>
      <h1>Todo List</h1>
      {newItemSection}
      {content}
    </main>
  );
};

export default Todo;
