import { useEffect, useState } from "react";
import Storage from "../../../firebase";

export default function useTodosItems() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const unsubscribe = Storage.subscribeTodos((todosObj) => {
      if (!todosObj) {
        setItems([]);
        return;
      }
      const todosArr = Object.keys(todosObj).map((key) => ({
        id: key,
        ...todosObj[key],
      }));
      setItems(todosArr);
    });

    return unsubscribe;
  }, []);

  const addItem = ({ title, description, date }) => {
    Storage.addTodo({ title, description, date, done: false });
  };

  const completeItem = (selectedItem) => {
    return Storage.editTodo(selectedItem.id, {
      ...selectedItem,
      done: !selectedItem.done,
    });
  };

  const deleteItem = (selectedItem) => {
    return Storage.deleteTodo(selectedItem);
  };

  const editItem = (newItem, item) => {
    return Storage.editTodo(item.id, newItem);
  };

  return [items, addItem, deleteItem, completeItem, editItem];
}
