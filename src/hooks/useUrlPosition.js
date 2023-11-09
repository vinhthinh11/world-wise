import { useSearchParams } from 'react-router-dom';

export function useUrlPositoin() {
  const [searchParams, _] = useSearchParams();
  const lat = searchParams.get('lat');
  const lng = searchParams.get('lng');
  return [lat, lng];
}
