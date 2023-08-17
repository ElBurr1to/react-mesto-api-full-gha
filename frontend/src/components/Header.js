import logo from '../images/logo.png';
import { Link, useLocation  } from 'react-router-dom';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import React from 'react';

function Header(props) {
  const [isBurgerOpen, setBurgerOpen] = React.useState(false);
  const location = useLocation();

  function handleBurgerClick() {
    setBurgerOpen(!isBurgerOpen);
  }

  return (
    <>
      {isBurgerOpen && props.loggedIn ?
        <Navbar
          userEmail={props.userEmail}
          onSignOut={props.onSignOut}
          isBurgerOpen={isBurgerOpen}
        /> :
        <></>
      }
      <header className="header page__header">
        <img src={logo} alt="Логотип сайта Место" className="header__logo" />
        <Routes>
          <Route exact path="/" element={
            <>
              <div className={`burger ${isBurgerOpen ? "burger_active" : ""}`} onClick={handleBurgerClick}>
                <div className={`burger__line ${isBurgerOpen ? "burger__line_active" : ""}`}></div>
                <div className={`burger__line ${isBurgerOpen ? "burger__line_active" : ""}`}></div>
                <div className={`burger__line ${isBurgerOpen ? "burger__line_active" : ""}`}></div>
              </div>
              <Navbar
                userEmail={props.userEmail}
                onSignOut={props.onSignOut}
                isBurgerOpen={false}
              />
            </>
          }/>
          <Route path="/signin" element={
            <Link to="/signup" className='link header__link'>
              Зарегистрироваться
            </Link>
          }/>
          <Route path="/signup" element={
            <Link to="/signin" className='link header__link'>
              Войти
            </Link>
          }/>
        </Routes>
      </header>
    </>
  );
}

export default Header;