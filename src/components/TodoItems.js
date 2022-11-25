import styles from "./todoItem.module.less";

export default function TodoItems({ items, completeItem }) {
  return (
    <ul>
      {items?.map((item) => (
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
