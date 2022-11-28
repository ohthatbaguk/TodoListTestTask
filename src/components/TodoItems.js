import styles from "./todoItem.module.less";
import TodoItem from "./TodoItem/TodoItem";

export default function TodoItems({ items, completeItem, deleteItem }) {
  const viewItems = [
    ...items.filter((item) => !item.done),
    ...items.filter((item) => item.done),
  ];

  return (
    <ul className={styles.list}>
      {viewItems?.map((item) => (
        <TodoItem
          key={item.title}
          item={item}
          completeItem={completeItem}
          deleteItem={deleteItem}
        />
      ))}
    </ul>
  );
}
