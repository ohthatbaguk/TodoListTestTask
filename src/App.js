import { useRef, useState } from "react";
import TodoItems from "./components/TodoItems";
import styles from "./app.module.less";

function App() {
  const [items, setItems] = useState([]);
  const todosTitleRef = useRef();
  const todosDescriptionRef = useRef();

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const title = formData.get("todoTitle");
    const description = formData.get("todoDescription");
    addItem(title, description);

    const todoTitle = todosTitleRef.current;
    todoTitle.value = "";

    const todoDescription = todosDescriptionRef.current;
    todoDescription.value = "";
  };

  const addItem = (title, description) => {
    if (items.includes(title)) return;
    setItems((todo) => [{ title, description, done: false }, ...todo]);
  };

  const completeItem = (item) => {
    console.log(item);
  };

  return (
    <div>
      <form className={styles.todoForm} onSubmit={handleSubmit}>
        <input ref={todosTitleRef} name="todoTitle" type="text" />
        <input ref={todosDescriptionRef} name="todoDescription" type="text" />
        <input type="submit" />
      </form>
      <TodoItems completeItem={completeItem} items={items} />
    </div>
  );
}

export default App;
