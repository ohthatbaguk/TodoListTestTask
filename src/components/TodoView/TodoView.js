import styles from "../TodoList/TodoItem/todoItem.module.less";
import dayjs from "dayjs";

export default function TodoView({ item, deleteItem, completeItem, goEdit }) {
  const dateFormat = item.date ? dayjs(item.date).format("DD.MM.YYYY") : null;
  const dateFromTask = item.date;
  const dateNow = Date.now();

  const isExpired = dateFromTask > dateNow;

  return (
    <li className={item.done ? styles.done : null}>
      <input
        type="checkbox"
        checked={item.done}
        onChange={() => completeItem(item)}
      />
      <div>
        <span className={styles.title}>{item.title}</span>
        <p className={styles.description}>{item.description}</p>
        {!!dateFormat && (
          <p className={isExpired ? styles.date : styles.expired}>
            {dateFormat}
          </p>
        )}
      </div>
      <button onClick={goEdit}>edit</button>
      <button onClick={() => deleteItem(item)} className={styles.button}>
        delete
      </button>
    </li>
  );
}
