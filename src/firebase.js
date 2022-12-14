import { initializeApp } from "firebase/app";
import {
  getDatabase,
  ref,
  set,
  remove,
  onValue,
  child,
  push,
} from "firebase/database";
import {
  getStorage,
  uploadBytes,
  ref as storageRef,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDcQNMatoumyCMgHQk1Al4jB0SKXBzHm0w",
  authDomain: "natallia-saigak-todo.firebaseapp.com",
  projectId: "natallia-saigak-todo",
  storageBucket: "natallia-saigak-todo.appspot.com",
  messagingSenderId: "724988228186",
  appId: "1:724988228186:web:99985ea4337b8f020e1e63",
  measurementId: "G-3VP3X18V2Z",
  databaseURL:
    "https://natallia-saigak-todo-default-rtdb.europe-west1.firebasedatabase.app",
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

const storage = getStorage(app);

const Storage = {
  async uploadFile(file) {
    const image = storageRef(storage, file.name);
    const meta = await uploadBytes(image, file);
    const downloadUrl = await getDownloadURL(meta.ref);
    return { name: meta.ref.name, url: downloadUrl };
  },

  deleteFile(name) {
    const desertRef = storageRef(storage, name);
    return deleteObject(desertRef);
  },

  addTodo(item) {
    return push(ref(db, "todos"), item);
  },

  async deleteTodo(item) {
    await remove(ref(db, `todos/${item.id}`));
    if (item.fileMeta) {
      await this.deleteFile(item.fileMeta.name);
    }
  },

  editTodo(id, item) {
    return set(ref(db, `todos/${id}`), item);
  },

  subscribeTodos(cb) {
    const unsubscribe = onValue(child(ref(db), `todos`), (snapshot) => {
      cb(snapshot.val());
    });
    return unsubscribe;
  },
};

export default Storage;
