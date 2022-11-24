export default function TodoItems({ items }) {
  return (
    <ul>
      {items?.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}
