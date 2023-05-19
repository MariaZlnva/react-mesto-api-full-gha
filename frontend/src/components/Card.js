import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  //подписываемся на контекст
  const currentUser = React.useContext(CurrentUserContext);

  const handleClick = () => {
    onCardClick(card);
  };
  const handleLikeClick = () => {
    onCardLike(card);
  };
  const handleDeleteClick = () => {
    onCardDelete(card);
  };
  // Определяем, являемся ли мы владельцем текущей карточки
  const isOwn = card.owner._id === currentUser._id;
  // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  const isLiked = card.likes.some((i) => i._id === currentUser._id);
  // Создаём переменную, которую после зададим в `className` для кнопки лайка
  const cardLikeButtonClassName = `card__like ${isLiked && "card_like-active"}`;

  return (
    <>
      {isOwn && (
        <button
          aria-label="Удалить"
          className="card__delete"
          type="button"
          onClick={handleDeleteClick}
        />
      )}
      <img
        src={`${card.link}`}
        alt={card.name}
        className="card__image"
        onClick={handleClick}
      />
      <div className="card__info">
        <h2 className="card__title">{card.name}</h2>
        <div>
          <button
            aria-label="Нравится"
            className={cardLikeButtonClassName}
            type="button"
            onClick={handleLikeClick}
          ></button>
          <div className="card__calcul-like">{card.likes.length}</div>
        </div>
      </div>
    </>
  );
}

export default Card;
