import React from 'react';
import auth from '../utils/Auth';
import { useNavigate} from 'react-router-dom';
import { useForm } from '../hooks/useForm.js';

function Login(props) {
  const {values, handleChange, setValues} = useForm({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  function handleSubmit(evt) {
    evt.preventDefault();
    auth.signin(values.email, values.password)
      .then(res => {
        if (res) {
          setValues({
            email: "",
            password: "",
          });
          props.onLoggin(values.email);
          navigate('/', {replace: true});
        }
      })
      .catch(err => {
        let errorText;
        switch (err) {
          case 400:
            errorText = "Не передано одно из полей";
            break;
          case 401:
            errorText = "Пользователь с email не найден или неверный пароль";
            break;
          default:
            errorText = "Что-то пошло не так. Пу-пу-пуу";
            break;
        }

        props.showInfoToolTip({
          isOpen: true,
          isSuccess: false,
          text: errorText,
        });
      })
  }

  return (
    <section className="login">
      <form name={props.name} onSubmit={handleSubmit} className="form">
        <div className="form__content">
          <h1 className="form__title">Вход</h1>
          <input type="text" id="email" name="email" className="form__input form__input_type_email form__input_type_dark" value={values.email} onChange={handleChange} placeholder="Email" aria-label="Email" required minLength="2" maxLength="40" />
          <p className="form__input-error form__input-error_type_email">Ошибка</p>
          <input type="password" id="password" name="password" className="form__input form__input_type_password form__input_type_dark" value={values.password} onChange={handleChange} placeholder="Пароль" aria-label="Пароль" required minLength="2" maxLength="200" />
          <p className="form__input-error form__input-error_type_password">Ошибка</p>
          <button type="submit" className={`form__submit-btn form__submit-btn_type_signin`} aria-label="Войти">Войти</button>
        </div>
      </form>
    </section>
  );
}

export default Login;