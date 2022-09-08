import { Link, useLocation } from 'react-router-dom';

function Header({ logo, userData, loggedIn, signOut }) {
  const location = useLocation();

  return (
    <header className="header">
      <img src={logo} alt="логотип" className="header__logo"/>
      <div className="header__block">
        {loggedIn && <p className="header__email">{userData.email}</p>}
        {loggedIn && <button onClick={signOut} className="header__btn">Выйти</button>}
        {location.pathname === '/sign-up' && <Link to="sign-in" className="header__btn">Войти</Link>}
        {location.pathname === '/sign-in' && <Link to="sign-up" className="header__btn">Зарегистрироваться</Link>}
      </div>
    </header>
  );
}

export default Header;
