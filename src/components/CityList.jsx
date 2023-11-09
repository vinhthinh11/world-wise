import styles from './CityList.module.css';
import Spinner from './Spinner';
import CityItem from './CityItem';
import Message from './Message';
import { useCity } from '../contexts/CitiesContext';
function CityList() {
  const { cities, isLoading } = useCity();
  if (isLoading) return <Spinner />;
  if (!cities.length)
    return <Message message={'ban chua chon thanh pho nao ca'} />;
  return (
    <ul className={styles.cityList}>
      {cities.map(va => (
        <CityItem key={va.id} cities={va} />
      ))}
    </ul>
  );
}

export default CityList;
