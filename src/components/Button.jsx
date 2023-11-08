import styles from './Button.module.css';
function Button({ children, onClick, type }) {
  return (
    <button className={`${styles[type]} ${styles.btn}`} onClick={onClick}>
      {children}
    </button>
  );
}

export default Button;
