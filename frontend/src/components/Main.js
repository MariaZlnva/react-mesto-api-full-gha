import React from "react";
import plus from "../images/plus.svg";
import pen from "../images/pen.svg";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Main({
  cards,
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  onCardClick,
  onCardLike,
  onCardDelete,
}) {
  //подписываемся на контекст
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="content page__content">
      <section className="profile content__profile">
        <div className="profile__info">
          <div className="profile__btn-avatar" onClick={onEditAvatar}>
            <img
              src={currentUser.avatar}
              alt="Аватарка"
              className="profile__avatar"
            />
          </div>
          <div className="profile__title-box">
            <h1 className="profile__title">{currentUser.name}</h1>
            <button
              className="profile__edit"
              type="button"
              onClick={onEditProfile}
            >
              <img src={pen} alt="Редактировать" />
            </button>
          </div>
          <p className="profile__subtitle">{currentUser.about}</p>
        </div>
        <button className="profile__add" type="button" onClick={onAddPlace}>
          <img src={plus} alt="Добавить" className="profile__add-image" />
        </button>
      </section>

      <section className="places" aria-label="Публикации">
        {cards.map((card, i) => (
          <article className="card" key={card._id}>
            <Card
              card={card}
              onCardClick={onCardClick}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}
            />
          </article>
        ))}
      </section>
    </main>
  );
}

export default Main;
