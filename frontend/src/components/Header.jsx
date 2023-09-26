import { Link, Route, Routes } from "react-router-dom";
import logo from "../images/header__logo.svg";

function Header(props) {
  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="Логотип" />
      <div className="header__container">
        {props.loggedIn && <p className="header__email">{props.email}</p>}
        <Routes>
          <Route
            path="/signup"
            element={
              <Link to="/signin" className="header__exit">
                Войти
              </Link>
            }
          />
          <Route
            path="/signin"
            element={
              <Link to="/signup" className="header__exit">
                Регистрация
              </Link>
            }
          />
          <Route
            path="/"
            element={
              <Link
                to="signin"
                className="header__exit"
                onClick={props.onSignOut}
              >
                Выйти
              </Link>
            }
          />
        </Routes>
      </div>
    </header>
  );
}

export default Header;
