import PopupWithForm from './PopupWithForm.js';
import React from 'react';
import { AppContext } from '../contexts/AppContext.js';

function EditAvatarPopup(props) {
  const inputRef = React.useRef();
  const {isLoading} = React.useContext(AppContext);

  function handleSubmit(evt) {
    evt.preventDefault();

    props.onUpdateAvatar(inputRef.current.value);
  }

  React.useEffect(() => {
    inputRef.current.value = "";
  }, [props.isOpen]);

  return (
    <PopupWithForm
      name="avatar"
      title="Обновить аватар"
      submitTitle={isLoading? 'Сохранение...' : 'Сохранить'}
      isOpen={props.isOpen}
      onSubmit={handleSubmit}
    >
      <input ref={inputRef} type="url" id="avatar" name="avatar" className="form__input form__input_type_avatar" placeholder="Ссылка на новый аватар" aria-label="Ссылка" required />
      <p className="form__input-error form__input-error_type_avatar">Ошибка</p>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;






