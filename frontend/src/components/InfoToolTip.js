import { AppContext } from '../contexts/AppContext.js';
import React from 'react';

function InfoToolTip(props) {
  const {closeAllPopups} = React.useContext(AppContext);

  return (
    <section className={`popup popup_type_info ${props.isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__content popup__content_type_info">
        <div className={`popup__info-logo popup__info-logo_type_${props.isSuccess ? "success" : "fail"}`}></div>
        <p className="popup__info-text">{props.text}</p>
        <button type="button" className="popup__close-btn" aria-label="Закрыть" onClick={closeAllPopups}></button>
      </div>
    </section>
  );
}

export default InfoToolTip;