import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = props.card.owner._id === currentUser._id;
  const isLiked = props.card.likes.some(userId => userId === currentUser._id);

  function handleClick() {
    props.onCardClick(props.card);
  }

  function handleLikeClick() {
    props.onCardLike(props.card);
  }

  function handleDeleteClick() {
    props.onCardDelete(props.card)
  }

  return (
    <li className="card">
      <figure className="card__figure">
        <button className={`card__delete-btn ${isOwn && "card__delete-btn_visible"}`} aria-label="Удалить" onClick={handleDeleteClick}/>
        <img src={props.card.link} alt={props.card.name} className="card__photo" onClick={handleClick}/>
        <figcaption className="card__caption">
          <h2 className="card__name">{props.card.name}</h2>
          <div className="card__like-container">
            <button className={`card__like-btn ${isLiked && "card__like-btn_active"}`} onClick={handleLikeClick} aria-label="Лайк"/>
            <p className="card__like-counter">{props.card.likes.length}</p>
          </div>
        </figcaption>
      </figure>
    </li>
  );
}

export default Card;
