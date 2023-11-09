import { useNavigate, useSearchParams } from 'react-router-dom';
import styles from './Map.module.css';
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvents,
} from 'react-leaflet';
import { useEffect, useState } from 'react';
import { useCity } from '../contexts/CitiesContext';
import { useGeolocation } from '../hooks/useGeoLocation';
import Button from './Button';
import { useUrlPositoin } from '../hooks/useUrlPosition';
function Map() {
  const { cities } = useCity();
  // 1> we get the position of the map form the URL of the browser
  const {
    isLoading: isLoadingPosition,
    position: geoLocation,
    getPosition,
  } = useGeolocation();
  const [mapLat, mapLng] = useUrlPositoin();

  const [mapPosition, setMapPosition] = useState({ lat: 40, lng: 0 });
  useEffect(() => {
    if (mapLat && mapLng) setMapPosition({ lat: mapLat, lng: mapLng });
  }, [mapLat, mapLng]);
  useEffect(() => {
    if (geoLocation) setMapPosition(geoLocation);
  }, [geoLocation]);

  return (
    <div className={styles.mapContainer}>
      {!geoLocation && (
        <Button type={'position'} onClick={getPosition}>
          {isLoadingPosition ? 'Loading' : 'Get you current position'}
        </Button>
      )}
      <MapContainer
        center={mapPosition}
        zoom={6}
        scrollWheelZoom={true}
        className={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {cities.map(city => (
          <Marker position={city.position} key={city.id}>
            <Popup>
              <span>
                {city.emoji} {city.cityName}
              </span>
            </Popup>
          </Marker>
        ))}
        <ChangeCenter position={mapPosition} />
        <DetectClicked />
      </MapContainer>
    </div>
  );
}
function ChangeCenter({ position, zoomLevel = 6 }) {
  const map = useMap();
  map.setView(position, zoomLevel);
}

function DetectClicked() {
  const navigate = useNavigate();
  useMapEvents({
    click: e => {
      navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`);
    },
  });
}

export default Map;
