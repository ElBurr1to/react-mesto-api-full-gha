function Navbar(props) {
  return (
    <nav className={`navbar ${props.isBurgerOpen ? "navbar_type_burger" : ""}`}>
      <ul className={`navbar__list ${props.isBurgerOpen ? "navbar__list_type_burger" : ""}`}>
        <li className="navbar__item">{props.userEmail}</li>
        <li className="navbar__item"><button onClick={props.onSignOut} className="navbar__signout-btn">Выйти</button></li>
      </ul>
    </nav>
  );
}

export default Navbar;