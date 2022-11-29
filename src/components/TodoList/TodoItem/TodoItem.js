import TodoView from "../../TodoView/TodoView";
import TodoForm from "../TodoForm/TodoForm";
import { useState } from "react";

export default function TodoItem({ item, completeItem, deleteItem, editItem }) {
  const [isEdit, setIsEdit] = useState(false);

  const goEdit = () => {
    setIsEdit(true);
  };
  const onEditSubmit = (newItem) => {
    editItem(newItem, item);
    setIsEdit(false);
  };
  return isEdit ? (
    <li>
      <TodoForm item={item} onSubmit={onEditSubmit} />
    </li>
  ) : (
    <TodoView
      goEdit={goEdit}
      deleteItem={deleteItem}
      item={item}
      completeItem={completeItem}
    />
  );
}
