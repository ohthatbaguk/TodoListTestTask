import TodoItems from "../src/components/TodoList/TodoItems/TodoItems";
import useTodosItems from "./components/TodoList/hooks/useTodosItems";
import TodoForm from "./components/TodoList/TodoForm/TodoForm";

function App() {
  const [items, addItem, deleteItem, completeItem, editItem] = useTodosItems();

  return (
    <div>
      <h3>TODO List</h3>
      <TodoForm onSubmit={addItem} />
      <TodoItems
        deleteItem={deleteItem}
        completeItem={completeItem}
        items={items}
        editItem={editItem}
      />
    </div>
  );
}

export default App;
