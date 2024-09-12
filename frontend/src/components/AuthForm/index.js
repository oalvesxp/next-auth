import { useState } from 'react'
import Button from '../Button'
import styles from './AuthForm.module.css'
import { useRouter } from 'next/router'
import { authSVC } from '../../services/auth/authSVC'

export default function AuthForm() {
  const router = useRouter()
  const [values, setValues] = useState({
    user: 'oalvesxp',
    passwd: 'safepassword',
  })

  function handleChange(event) {
    const value = event.target.value
    const name = event.target.name

    setValues((current) => {
      return {
        ...current,
        [name]: value,
      }
    })
  }

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault()
        authSVC
          .login({
            username: values.user,
            password: values.passwd,
          })
          .then(() => {
            router.push('/auth-ssr') /** Server Side Render */
            /** router.push('/auth-ssg') /** Static Site Generation */
          })
          .catch((err) => {
            alert(err)
          })
      }}
    >
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
          value={values.user}
          onChange={handleChange}
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
          value={values.passwd}
          onChange={handleChange}
          required
        />
      </div>

      {/** Debug */}
      {/* <div className={styles.form__section}>
        <pre>{JSON.stringify(values, null, 2)}</pre>
      </div> */}

      <div className={styles.form__section}>
        <Button type="submit">Entrar</Button>
      </div>
    </form>
  )
}
