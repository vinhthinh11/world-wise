import { createContext, useContext, useEffect, useReducer } from 'react';

const CitiesContext = createContext();
function reducer(state, action) {
  switch (action.type) {
    case 'loading':
      return { ...state, isLoading: action.payload };
    case 'cities/loaded':
      return { ...state, isLoading: false, cities: action.payload };
    case 'cities/created':
      return { ...state, cities: [...state.cities, action.payload] };
    case 'cities/deleted':
      return {
        ...state,
        cities: [...state.cities.filter(c => c.id !== action.payload)],
      };
    case 'city/loaded':
      return { ...state, currentCity: action.payload };
    default:
      throw new Error('unknow instruction');
  }
}
const initialState = { cities: [], isLoading: false, currentCity: {} };
function CitiesProvider({ children }) {
  const [{ cities, isLoading, currentCity }, dispath] = useReducer(
    reducer,
    initialState
  );
  useEffect(function () {
    dispath({ type: 'loading', payload: true });
    fetch('http://localhost:8000/cities')
      .then(cities => {
        return cities.json();
      })
      .then(data => {
        dispath({ type: 'cities/loaded', payload: data });
      })
      .catch(err => console.log(err))
      .finally(() => {
        dispath({ type: 'loading', payload: false });
      });
  }, []);
  function getCity(id) {
    if (+id === currentCity.id) return;
    dispath({ type: 'loading', payload: true });
    fetch(`http://localhost:8000/cities/${id}`)
      .then(cities => {
        return cities.json();
      })
      .then(data => {
        dispath({ type: 'city/loaded', payload: data });
      })
      .catch(err => console.log(err))
      .finally(() => {
        dispath({ type: 'loading', payload: false });
      });
  }
  // update new city to server
  function updateCities(newCity) {
    dispath({ type: 'loading', payload: true });
    fetch(`http://localhost:8000/cities`, {
      method: 'post',
      body: JSON.stringify(newCity),
      headers: { 'Content-Type': 'application/json' },
    })
      .then(cities => {
        return cities.json();
      })
      .then(data => {
        dispath({ type: 'cities/created', payload: data });
      })
      .catch(err => console.log(err))
      .finally(() => {
        dispath({ type: 'loading', payload: false });
      });
  }
  function deleteCites(id) {
    dispath({ type: 'loading', payload: true });
    fetch(`http://localhost:8000/cities/${id}`, {
      method: 'delete',
    })
      .then(data => {
        dispath({ type: 'cities/deleted', payload: id });
      })
      .catch(err => console.log(err))
      .finally(() => {
        dispath({ type: 'loading', payload: false });
      });
  }
  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        getCity,
        updateCities,
        deleteCites,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}
function useCity() {
  const context = useContext(CitiesContext);
  if (context === undefined)
    throw new Error('CitiesContext must use as parent of components');
  return context;
}

export { CitiesProvider, useCity };
