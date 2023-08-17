import PopupWithForm from './PopupWithForm.js';
import React from 'react';
import { useForm } from '../hooks/useForm.js';
import { AppContext } from '../contexts/AppContext.js';

function AddPlacePopup(props) {
  const {values, handleChange, setValues} = useForm({
    name: "",
    link: "",
  });
  const {isLoading} = React.useContext(AppContext);

  function handleSubmit(evt) {
    evt.preventDefault();

    props.onAddPlace({
      name: values.name,
      link: values.link,
    });
  }

  React.useEffect(() => {
    setValues({
      name: "",
      link: ""
    });
  }, [props.isOpen]);

  return (
    <PopupWithForm
      name="add-place"
      title="Новое место"
      submitTitle={isLoading? 'Создание...' : 'Создать'}
      isOpen={props.isOpen}
      onSubmit={handleSubmit}
    >
      <input type="text" id="place-name" name="name" value={values.name} onChange={handleChange} className="form__input form__input_type_place-name" placeholder="Название" aria-label="Название" required minLength="2" maxLength="30" />
      <p className="form__input-error form__input-error_type_place-name">Ошибка</p>
      <input type="url" id="src" name="link" value={values.link} onChange={handleChange} className="form__input form__input_type_src" placeholder="Ссылка на картинку" aria-label="Ссылка" required />
      <p className="form__input-error form__input-error_type_src">Ошибка</p>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
