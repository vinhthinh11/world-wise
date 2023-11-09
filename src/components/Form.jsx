// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useEffect, useState } from 'react';

import styles from './Form.module.css';
import Button from './Button';
import BackButton from './BackButton';
import { useUrlPositoin } from '../hooks/useUrlPosition';
import Message from './Message';
import Spinner from './Spinner';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useCity } from '../contexts/CitiesContext';
import { useNavigate } from 'react-router-dom';

export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split('')
    .map(char => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

function Form() {
  const [cityName, setCityName] = useState('');
  const [country, setCountry] = useState('');
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState('');
  const [isLoadingGeoCoding, setIsLoadingGeoCoding] = useState(false);
  const [emoji, setEmoji] = useState('');
  const [geoError, setGeoError] = useState('');
  const navigate = useNavigate();
  // 1> get the position from the url
  const [lat, lng] = useUrlPositoin();
  const { updateCities, isLoading } = useCity();
  // 2> from the position get the city name and set to the form
  useEffect(() => {
    if (!(lat && lng)) return;
    async function fetchCityName() {
      try {
        setIsLoadingGeoCoding(true);
        setGeoError('');
        const res = await fetch(
          `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`
        );
        const data = await res.json();
        if (!data)
          throw new Error(
            'Could not get the city name base on the given lat and lng'
          );
        if (!data.countryCode)
          throw new Error(
            'This place dont belong to any country. Please select another place'
          );
        setCityName(data.city);
        setCountry(data.countryName);
        setEmoji(convertToEmoji(data.countryCode));
      } catch (error) {
        console.log(error);
        setGeoError(error.message);
      } finally {
        setIsLoadingGeoCoding(false);
      }
    }
    fetchCityName();
  }, [lat, lng]);
  async function handleSubmit(e) {
    e.preventDefault();
    if (!date || !cityName) throw new Error('Please enter date and city name');
    const newCity = {
      cityName,
      country,
      emoji,
      date,
      notes,
      position: { lat, lng },
    };
    await updateCities(newCity);
    navigate('/app/cities');
  }
  if (geoError) return <Message message={geoError} />;
  if (!(lat && lng))
    return <Message message={'Start by clicking somewhere on the map'} />;
  if (isLoadingGeoCoding) return <Spinner />;

  return (
    <form
      className={`${styles.form} ${isLoading ? styles['loading'] : ''}`}
      onSubmit={handleSubmit}
    >
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={e => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        {/* <input id="date" onChange={e => setDate(e.target.value)} value={date} /> */}
        <DatePicker
          id="date"
          selected={date}
          onChange={date => setDate(date)}
          dateFormat="dd/MM/yyyy"
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={e => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <BackButton />
        <Button type={'primary'}>Add</Button>
      </div>
    </form>
  );
}

export default Form;
