import React from 'react';
import { Link, useNavigate} from 'react-router-dom';
import auth from '../utils/Auth';
import { useForm } from '../hooks/useForm.js';

function Register(props) {
  const {values, handleChange, setValues} = useForm({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  function handleSubmit(evt) {
    evt.preventDefault();
    auth.register(values.email, values.password)
      .then(res => {
        props.showInfoToolTip({
          isOpen: true,
          isSuccess: true,
          text: "Вы успешно зарегистрировались!",
        });
        setValues({
          email: "",
          password: "",
        });
        navigate("/signin");
      })
      .catch(err => {
        props.showInfoToolTip({
          isOpen: true,
          isSuccess: false,
          text: "Что-то пошло не так. Попробуйте еще раз.",
        });
      })
  }

  return (
    <section className="login">
      <form name={props.name} onSubmit={handleSubmit} className="form">
        <div className="form__content">
          <h1 className="form__title">Регистрация</h1>
          <input type="text" id="email" name="email" className="form__input form__input_type_email form__input_type_dark" value={values.email} onChange={handleChange} placeholder="Email" aria-label="Email" required minLength="2" maxLength="40" />
          <p className="form__input-error form__input-error_type_email">Ошибка</p>
          <input type="password" id="password" name="password" className="form__input form__input_type_password form__input_type_dark" value={values.password} onChange={handleChange} placeholder="Пароль" aria-label="Пароль" required minLength="2" maxLength="200" />
          <p className="form__input-error form__input-error_type_password">Ошибка</p>
          <button type="submit" className={`form__submit-btn form__submit-btn_type_signin`} aria-label="Зарегистрироваться">Зарегистрироваться</button>
          <Link to="/signin" className='link form__link'>Уже зарегистрированы? Войти</Link>
        </div>
      </form>
    </section>
  );
}

export default Register;