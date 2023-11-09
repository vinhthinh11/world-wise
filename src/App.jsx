import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Product from './pages/Product';
import HomePage from './pages/HomePage';
import Pricing from './pages/Pricing';
import PageNotFound from './pages/PageNotFound';
import AppLayout from './pages/AppLayout';
import Login from './pages/Login';
import CityList from './components/CityList';
import City from './components/City';
import Form from './components/Form';
import CountryList from './components/CountryList';
import { CitiesProvider } from './contexts/CitiesContext';
import { AuthProvider } from './contexts/FakeAuthContext';
import ProtectedRoute from './pages/ProtectedRoute';

function App() {
  return (
    <CitiesProvider>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="product" element={<Product />} />
            <Route path="/" element={<HomePage />} />
            <Route path="pricing" element={<Pricing />} />
            {/* in the app route we will have some nested route --> we put the nested route as a childen of app route ex: root/app/nested */}
            <Route
              path="app"
              element={
                <ProtectedRoute>
                  <AppLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Navigate replace to="cities" />} />
              <Route path="cities" element={<CityList />} />
              <Route path="cities/:id" element={<City />} />
              <Route path="countries" element={<CountryList />} />
              <Route path="form" element={<Form />} />
            </Route>
            <Route path="login" element={<Login />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </CitiesProvider>
  );
}

export default App;
