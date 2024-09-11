import Button from '../Button'
import styles from './AuthForm.module.css'

export default function Box() {
  return (
    <form>
      <div className={styles.form__section}>
        <label className={styles.form__label} htmlFor="user">
          Insira seu usuário:
        </label>
        <input
          className={styles.form__input}
          placeholder="xpto.user"
          type="text"
          id="user"
          name="user"
          required
        />
      </div>
      <div className={styles.form__section}>
        <label className={styles.form__label} htmlFor="password">
          Insira sua senha:
        </label>
        <input
          className={styles.form__input}
          placeholder="password"
          type="password"
          id="password"
          name="password"
          required
        />
      </div>
      <div className={styles.form__section}>
        <Button type="submit">Entrar</Button>
      </div>
    </form>
  )
}
