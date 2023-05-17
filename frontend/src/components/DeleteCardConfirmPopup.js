import PopupWithForm from "./PopupWithForm";

const DeleteCardConfirmPopup = (isOpen, onClose, isValidForm) => {
  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      onSubmit ={}
      title="Вы уверены?"
      name="delete-card"
      titleBtn="Да"
      isValidForm={isValidForm}
    />
  );
};

export default DeleteCardConfirmPopup;

{
  /* <div class="popup popup_delete-card"> */
}
{
  /* <div class="popup__content">
  <button aria-label="Закрыть" class="popup__close" type="button"></button>
  <h2 class="popup__title">Вы уверены?</h2>
  <form class="popup__form" novalidate name="deleteCard">
    <button class="popup__button" type="submit">Да</button>
  </form>
</div>
</div> */
}
