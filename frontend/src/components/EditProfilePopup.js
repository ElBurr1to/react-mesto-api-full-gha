import PopupWithForm from './PopupWithForm.js';
import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import { useForm } from '../hooks/useForm.js';
import { AppContext } from '../contexts/AppContext.js';

function EditProfilePopup(props) {
  const {values, handleChange, setValues} = useForm({
    name: "",
    about: "",
  });
  const currentUser = React.useContext(CurrentUserContext);
  const {isLoading} = React.useContext(AppContext);

  function handleSubmit(evt) {
    evt.preventDefault();

    props.onUpdateUser({
      name: values.name,
      about: values.about,
    });
  }

  React.useEffect(() => {
    setValues({
      name: currentUser.name,
      about: currentUser.about,
    })
  }, [currentUser, props.isOpen]);

  return (
    <PopupWithForm
      name="edit-profile"
      title="Редактировать профиль"
      submitTitle={isLoading? 'Сохранение...' : 'Сохранить'}
      isOpen={props.isOpen}
      onSubmit={handleSubmit}
    >
      <input type="text" id="name" name="name" className="form__input form__input_type_full-name" value={values.name} onChange={handleChange} placeholder="Имя" aria-label="Имя" required minLength="2" maxLength="40" />
      <p className="form__input-error form__input-error_type_name">Ошибка</p>
      <input type="text" id="about" name="about" className="form__input form__input_type_status" value={values.about} onChange={handleChange} placeholder="О себе" aria-label="О себе" required minLength="2" maxLength="200" />
      <p className="form__input-error form__input-error_type_about">Ошибка</p>

    </PopupWithForm>
  );
}

export default EditProfilePopup;






