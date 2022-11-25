import styles from "./todoItem.module.less";

export default function TodoItems({ items, completeItem }) {
  const viewItems = [
    ...items.filter((item) => !item.done),
    ...items.filter((item) => item.done),
  ];
  return (
    <ul>
      {viewItems?.map((item) => (
        <li
          className={item.done ? styles.done : null}
          onClick={() => completeItem(item)}
          key={item.title}
        >
          {item.title}
        </li>
      ))}
    </ul>
  );
}
