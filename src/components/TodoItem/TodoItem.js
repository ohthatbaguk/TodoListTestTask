import styles from "../todoItem.module.less";
import dayjs from "dayjs";

export default function TodoItem({ item, completeItem, deleteItem }) {
  const dateFromTask = item.date;
  const dateNow = Date.now();

  const dateFormat = dayjs(item.date).format("DD.MM.YYYY");
  const isExpired = dateFromTask > dateNow;

  return (
    <li className={item.done ? styles.done : null}>
      <div>
        <span className={styles.title} onClick={() => completeItem(item)}>
          {item.title}
        </span>
        <p className={styles.description}>{item.description}</p>
        <p className={isExpired ? styles.date : styles.expired}>{dateFormat}</p>
      </div>
      <button onClick={() => deleteItem(item)} className={styles.button}>
        delete
      </button>
    </li>
  );
}
