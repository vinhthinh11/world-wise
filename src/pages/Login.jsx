import { useNavigate } from 'react-router-dom';
import PageNav from '../components/PageNav';
import { useAuth } from '../contexts/FakeAuthContext';
import styles from './Login.module.css';
import { useEffect, useState } from 'react';
import Button from '../components/Button';

export default function Login() {
  const navigate = useNavigate();
  const { login, isAuthented } = useAuth();
  // PRE-FILL FOR DEV PURPOSES
  const [email, setEmail] = useState('vinhthinh@gmail.com');
  const [password, setPassword] = useState('thinh123');
  useEffect(() => {
    if (isAuthented) {
      navigate('/app', { replace: true });
    }
  }, [isAuthented]);
  function handleSubmit(e) {
    e.preventDefault();
    if (email && password) login(email, password);
    console.log(isAuthented);
  }

  return (
    <main className={styles.login}>
      <PageNav />
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.row}>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            onChange={e => setEmail(e.target.value)}
            value={email}
          />
        </div>

        <div className={styles.row}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={e => setPassword(e.target.value)}
            value={password}
          />
        </div>

        <div>
          <Button type="primary">Login</Button>
        </div>
      </form>
    </main>
  );
}
