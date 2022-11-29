import styles from "../../../app.module.less";
import { useRef, useState } from "react";
import dayjs from "dayjs";
import Storage from "../../../firebase";

export default function TodoForm({ onSubmit, item = null }) {
  const [title, setTitle] = useState(item?.title ?? "");
  const [description, setDescription] = useState(item?.description ?? "");
  const [date, setDate] = useState(item?.date ?? "");
  const [predefinedFile, setPredefinedFile] = useState(item?.fileMeta);
  const fileRef = useRef();

  const clearFile = (event) => {
    event.preventDefault();
    setPredefinedFile(null);
  };

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
    fileRef.current.value = "";
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const file = formData.get("file");
    let fileMeta = predefinedFile;
    if (file) {
      fileMeta = await Storage.uploadFile(file);
    }

    onSubmit({
      title,
      description,
      date: date ? dayjs(date).valueOf() : null,
      fileMeta,
    });
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
      {predefinedFile ? (
        <div>
          <a href={predefinedFile.url}>{predefinedFile.name}</a>
          <button onClick={clearFile}>Clear</button>
        </div>
      ) : (
        <input type="file" multiple name="file" ref={fileRef} />
      )}
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
