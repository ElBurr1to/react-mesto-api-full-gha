import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import avatar from '../images/avatar.jpg';
import api from '../utils/Api';
import Card from './Card.js';

function Main(props) {

  const currentUser = React.useContext(CurrentUserContext);

  return (
  <main>
    <section className="profile page__profile">
      <div className="profile__avatar" onClick={props.onEditAvatar}>
        <img src={currentUser.avatar} alt="Аватар пользователя" className="profile__avatar-img" />
        <div className="profile__avatar-edit"></div>
      </div>
      <div className="profile__info">
        <div className="profile__name-row">
          <h1 className="profile__name">{currentUser.name}</h1>
          <button className="profile__edit-btn" aria-label="Редактировать" onClick={props.onEditProfile}></button>
        </div>
        <p className="profile__status">{currentUser.about}</p>
      </div>
      <button className="profile__add-btn" aria-label="Добавить место" onClick={props.onAddPlace}></button>
    </section>
    <section className="places page__places">
      <ul className="places__list">
        {props.cards.map(card => (
          <Card
            card={card}
            onCardClick={props.onCardClick}
            onCardLike={props.onCardLike}
            onCardDelete={props.onCardDelete}
            key={card._id}/>
        ))}
      </ul>
    </section>
  </main>
  );
}

export default Main;
