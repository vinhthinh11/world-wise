import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/FakeAuthContext';
import { useEffect } from 'react';

function ProtectedRoute({ children }) {
  const { isAuthented } = useAuth();
  // noi chung co ban la kiem tra xem nguoi dung co authenticated hay khong neu khong thi chuyen nguoi dung ve trang login
  const navigate = useNavigate();
  // chay useEffect to check authented
  useEffect(() => {
    if (!isAuthented) navigate('/login');
  }, [isAuthented]);
  return children;
}

export default ProtectedRoute;
