import { useCallback, useState } from "react";
import { Link, useHistory } from "react-router-dom";

import Header from "../Header/Header";

import { passwordRegex } from "../../utils/registrationUtils";
import { registrationUser } from "../../services/usersService";

import domain from "../../icons/Domain.svg";

import style from "./Regstration.module.scss";

const Registration = ({ setIsLogin }) => {
  const history = useHistory();

  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [error, setError] = useState({
    login: null,
    password: null,
    repeatPassword: null,
  });

  const validPassword = passwordRegex.test(password);

  const userRegistration = useCallback(
    (e) => {
      e.preventDefault();
      if (login.length < 6) {
        setError({
          ...error,
          login: "Длина логина должна быть не менее 6 символов",
        });
      } else if (!validPassword) {
        setError({
          ...error,
          password:
            "Длина пароля должна быть не меньше 6 символов, обязательно состоять из латинских символов и содержать число",
        });
      } else if (password !== repeatPassword) {
        setError({
          ...error,
          repeatPassword: "Пароли не совпадают",
        });
      } else {
        registrationUser(
          login,
          password,
          repeatPassword,
          setIsLogin,
          setError,
          error,
          history
        );
      }
    },
    [login, password, repeatPassword, error, history, setIsLogin, validPassword]
  );

  return (
    <>
      <Header title="Зарегистрироваться в системе" />
      <main className={style.registration_content}>
        <img
          src={domain}
          alt="Domain"
          className={style.registration_domain_image}
        />
        <div className={style.form_container}>
          <h2 className={style.form_label}>Регистрация</h2>
          <form
            className={style.registration_form}
            onSubmit={(e) => userRegistration(e)}
          >
            <label className={style.form_text}>Login:</label>
            <input
              type="text"
              placeholder="Login"
              className={style.form_input}
              value={login}
              onChange={(e) => {
                setLogin(e.target.value);
                setError({ ...error, login: null });
              }}
            />
            <div className={style.form_error_text}>
              {error.login && <p>{error.login}</p>}
            </div>
            <label className={style.form_text}>Password:</label>
            <input
              type="password"
              placeholder="Password"
              className={style.form_input}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError({ ...error, password: null });
              }}
            />
            <div className={style.form_error_text}>
              {error.password && <p title={error.password}>{error.password}</p>}
            </div>
            <label className={style.form_text}>Repeat password:</label>
            <input
              type="password"
              placeholder="Password"
              className={style.form_input}
              value={repeatPassword}
              onChange={(e) => {
                setRepeatPassword(e.target.value);
                setError({ ...error, repeatPassword: null });
              }}
            />
            <div className={style.form_error_text}>
              {error.repeatPassword && <p>{error.repeatPassword}</p>}
            </div>
            <button
              className={style.form_button}
              disabled={
                !(!error.login && !error.password && !error.repeatPassword)
              }
            >
              Зарегистрироваться
            </button>
          </form>
          <Link className={style.link_to_authorization} to="/login">
            Авторизоваться
          </Link>
        </div>
      </main>
    </>
  );
};

export default Registration;
