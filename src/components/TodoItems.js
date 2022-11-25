import styles from "./todoItem.module.less";

export default function TodoItems({ items, completeItem, deleteItem }) {
  const viewItems = [
    ...items.filter((item) => !item.done),
    ...items.filter((item) => item.done),
  ];

  return (
    <ul className={styles.list}>
      {viewItems?.map((item) => (
        <li className={item.done ? styles.done : null} key={item.title}>
          <span onClick={() => completeItem(item)}>{item.title}</span>
          <button onClick={() => deleteItem(item)} className={styles.button}>
            delete
          </button>
        </li>
      ))}
    </ul>
  );
}
