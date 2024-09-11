import styles from './Button.module.css'

export default function Button({ children, type, onClick, ...props }) {
  return (
    <button className={styles.button} type={type} onClick={onClick}>
      {children}
    </button>
  )
}
