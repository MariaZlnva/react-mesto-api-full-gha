import React from "react";
import AuthForm from "./AuthForm";

function Register({isShow, onSubmit}) {
  return (
    <AuthForm title="Регистрация" titleBtn="Зарегистрироваться" isShow = {isShow} onSubmit={onSubmit}/> 
  );
}

export default Register;
