import React from "react";
import AuthForm from "./AuthForm";

function Login({onSubmit}) {
  return (
    <AuthForm title="Вход" titleBtn="Войти" onSubmit={onSubmit}/>
  );
}

export default Login;
