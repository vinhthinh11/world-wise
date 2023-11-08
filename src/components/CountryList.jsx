import styles from './CountryList.module.css';
import Spinner from './Spinner';
import CountryItem from './CountryItem';
import Message from './Message';
function CountryList({ cities, isLoading }) {
  const contries = cities.reduce((acc, city) => {
    if (!acc.map(city => city.country).includes(city.country))
      return [...acc, city];
    return acc;
  }, []);
  if (isLoading) return <Spinner />;
  if (!cities.length)
    return <Message message={'ban chua chon quoc gia nao ca'} />;
  return (
    <ul className={styles.countryList}>
      {contries.map(va => (
        <CountryItem key={va.id} countries={va} />
      ))}
    </ul>
  );
}

export default CountryList;
