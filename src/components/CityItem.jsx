import { Link } from 'react-router-dom';
import styles from './CityItem.module.css';
const formatDate = date =>
  new Intl.DateTimeFormat('en', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(date));
function CityItem({ cities }) {
  return (
    <li>
      <Link
        to={`${cities.id}?lat=${cities.position.lat}&lng=${cities.position.lng}`}
        className={styles.cityItem}
      >
        {cities.emoji}
        <h3 className={styles.name}>{cities.cityName}</h3>
        <time className={styles.date}>{formatDate(cities.date)}</time>
        <button className={styles.deleteBtn}>&times;</button>
      </Link>
    </li>
  );
}

export default CityItem;
