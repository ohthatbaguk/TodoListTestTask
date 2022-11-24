import { useRef, useState } from "react";
import TodoItems from "./TodoItems";

function App() {
  const [items, setItems] = useState([]);
  const todosRef = useRef();
  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const item = formData.get("todoItem");
    addItem(item);

    const element = todosRef.current;
    element.value = "";
  };

  const addItem = (item) => {
    if (items.includes(item)) return;
    setItems((todo) => [item, ...todo]);
  };

  return (
    <div>
      <form className={styles.todoForm} onSubmit={handleSubmit}>
        <input ref={todosRef} name="todoTitle" type="text" />
        <input name="todoDescription" type="text" />
        <input type="submit" />
      </form>
      <TodoItems items={items} />
    </div>
  );
}

export default App;
