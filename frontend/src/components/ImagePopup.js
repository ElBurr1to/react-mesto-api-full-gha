import { AppContext } from '../contexts/AppContext.js';
import React from 'react';

function ImagePopup(props) {
  const {closeAllPopups} = React.useContext(AppContext);
  return (
    <section className={`popup popup_type_image ${props.card ? 'popup_opened' : ''}`}>
      <figure className="popup__figure">
        <img src={props.card ? props.card.link : ""} alt={props.card ? props.card.name : ""} className="popup__photo" />
        <figcaption className="popup__caption">{props.card ? props.card.name : ""}</figcaption>
        <button className="popup__close-btn" aria-label="Удалить" onClick={closeAllPopups}></button>
      </figure>
    </section>
  );
}

export default ImagePopup;