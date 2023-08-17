import { AppContext } from '../contexts/AppContext.js';
import React from 'react';

function PopupWithForm(props) {
  const {closeAllPopups} = React.useContext(AppContext);

  return (
    <section className={`popup popup_type_${props.name} ${props.isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__content popup__content_type_form">
        <form  name={props.name} onSubmit={props.onSubmit} className="form">
          <p className="form__text">{props.title}</p>
          {props.children}
          <button type="submit" className={`form__submit-btn form__submit-btn_type_${props.name}`} aria-label={props.submitTitle}>{props.submitTitle}</button>
          <button type="button" className="popup__close-btn" aria-label="Закрыть" onClick={closeAllPopups}></button>
        </form>
      </div>
    </section>
  );
}

export default PopupWithForm;
