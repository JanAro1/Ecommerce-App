export default function Rating({ value = 0 }) {
  return <span aria-label={`Rating ${value} out of 5`}>⭐ {value}</span>;
}
