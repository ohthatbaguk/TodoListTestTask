import { useState } from "react";

export default function useTodosItems() {
  const [items, setItems] = useState([]);

  const addItem = ({ title, description, date }) => {
    setItems((todo) => [{ title, description, date, done: false }, ...todo]);
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

  const editItem = (newItem, item) => {
    setItems((prevItems) => {
      const newItems = [...prevItems];
      newItems.splice(newItems.indexOf(item), 1);
      newItems.push(newItem);
      return newItems;
    });
  };

  return [items, addItem, deleteItem, completeItem, editItem];
}
