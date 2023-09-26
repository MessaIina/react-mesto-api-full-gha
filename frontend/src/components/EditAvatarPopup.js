import React, { useEffect, useRef, useState } from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const [avatar, setAvatar] = useState("");
  const avatarRef = useRef("");

  function handleChange(event) {
    setAvatar(event.target.value);
  }

  function handleSubmit() {
    onUpdateAvatar({
      avatar: avatar,
    });
  }

  useEffect(() => {
    if (isOpen) {
      setAvatar("");
    }
  }, [isOpen]);

  return (
    <PopupWithForm
      onSubmit={handleSubmit}
      name="avatar"
      title="Обновить аватар"
      isOpen={isOpen}
      onClose={onClose}
      buttonText="Сохранить"
    >
      <input
        value={avatar}
        onChange={handleChange}
        ref={avatarRef}
        className="form__item form__item-edit-avatar"
        id="avatar"
        name="avatar"
        type="url"
        placeholder="Ссылка на аватар"
        required
      />
      <span
        className="form__item-error form__item-avatar-error"
        id="avatar-error"
      ></span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
