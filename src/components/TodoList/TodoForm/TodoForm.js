import styles from "../../../app.module.less";
import { useState } from "react";
import dayjs from "dayjs";

export default function TodoForm({ onSubmit, item = null }) {
  const [title, setTitle] = useState(item?.title ?? "");
  const [description, setDescription] = useState(item?.description ?? "");
  const [date, setDate] = useState(item?.date ?? ""); // YYYY-MM-DD

  const handleChangeTitle = (event) => {
    setTitle(event.target.value);
  };

  const handleChangeDescription = (event) => {
    setDescription(event.target.value);
  };

  const handleChangeDate = (event) => {
    setDate(event.target.value);
  };

  const clearForm = () => {
    setTitle("");
    setDescription("");
    setDate("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({ title, description, date: date ? dayjs(date).valueOf() : null });
    clearForm();
  };

  return (
    <form className={styles.todoForm} onSubmit={handleSubmit}>
      <input
        value={title}
        required
        onChange={handleChangeTitle}
        placeholder="title"
        name="todoTitle"
        type="text"
      />
      <input
        value={description}
        onChange={handleChangeDescription}
        placeholder="description"
        name="todoDescription"
        type="text"
      />
      <input
        value={date ? dayjs(date).format("YYYY-MM-DD") : ""}
        onChange={handleChangeDate}
        type="date"
        name="todoDate"
      />
      <input type="submit" />
    </form>
  );
}
