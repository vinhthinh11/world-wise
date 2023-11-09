import { useReducer } from 'react';
import { useContext } from 'react';
import { createContext } from 'react';
const FAKE_USER = {
  name: 'Thinh',
  email: 'vinhthinh@gmail.com',
  password: 'thinh123',
  avatar: 'https://i.pravatar.cc/100?u=zz',
};
function reducer(state, action) {
  switch (action.type) {
    case 'login':
      return { ...state, isAuthented: true, user: action.payload };
    case 'logout':
      return { ...state, isAuthented: false, user: null };
    default:
      throw new Error('instruction is not supported');
  }
}
const initialState = { user: null, isAuthented: false };

const AuthContext = createContext();
function AuthProvider({ children }) {
  const [{ user, isAuthented }, dispath] = useReducer(reducer, initialState);
  function login(email, password) {
    if (email === FAKE_USER.email && password === FAKE_USER.password) {
      dispath({ type: 'login', payload: FAKE_USER });
    }
  }
  function logout() {
    dispath({ type: 'logout' });
  }
  return (
    <AuthContext.Provider value={{ user, isAuthented, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined)
    throw new Error('context was you outside provider');
  return context;
}
export { AuthProvider, useAuth };
