import styles from './CountryItem.module.css';

function CountryItem({ countries }) {
  return (
    <li className={styles.countryItem}>
      <span className={styles.emoji}>{countries.emoji}</span>
      <span>{countries.country}</span>
    </li>
  );
}

export default CountryItem;
