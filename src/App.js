import { useEffect, useRef, useState } from "react";
import TodoItems from "./components/TodoItems";
import styles from "./app.module.less";
const dayjs = require("dayjs");

function App() {
  const [items, setItems] = useState([]);
  const todosTitleRef = useRef();
  const todosDescriptionRef = useRef();

  const addItem = (title, description, date) => {
    setItems((todo) => [
      { title, description, date: dayjs(date).valueOf(), done: false },
      ...todo,
    ]);
  };

  useEffect(() => console.log(items), [items]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const title = formData.get("todoTitle");
    const description = formData.get("todoDescription");
    const date = formData.get("todoDate");
    addItem(title, description, date);

    const todoTitle = todosTitleRef.current;
    todoTitle.value = "";

    const todoDescription = todosDescriptionRef.current;
    todoDescription.value = "";
  };

  const completeItem = (selectedItem) => {
    setItems((prevItems) => {
      const newItems = [...prevItems];
      newItems.splice(newItems.indexOf(selectedItem), 1);
      newItems.push({ ...selectedItem, done: !selectedItem.done });
      return newItems;
    });
  };

  const deleteItem = (selectedItem) => {
    setItems((todos) => todos.filter((item) => item !== selectedItem));
  };

  return (
    <div>
      <h3>TODO List</h3>
      <form className={styles.todoForm} onSubmit={handleSubmit}>
        <input
          placeholder="title"
          ref={todosTitleRef}
          name="todoTitle"
          type="text"
        />
        <input
          placeholder="description"
          ref={todosDescriptionRef}
          name="todoDescription"
          type="text"
        />
        <input type="date" name="todoDate" />
        <input type="submit" />
      </form>
      <TodoItems
        deleteItem={deleteItem}
        completeItem={completeItem}
        items={items}
      />
    </div>
  );
}

export default App;
