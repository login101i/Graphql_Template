import React, { useContext, useState } from "react";
import { Menu } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth";

function MenuBar() {
  const [activeItem, setActiveItem] = useState(path);
  const { user, logout } = useContext(AuthContext);

  const pathname = window.location.pathname;

  const path = pathname === "/" ? "home" : pathname.substr(1);
  //? Chyba przeczytaj pathname ale pomiń wszystko od 1 w lewo.

  const handleItemClick = (e, { name }) => setActiveItem(name);
  //? skąd ta funkcja wzieła niby to name?

  //? wow tutaj robimy component jako const i robimy na końcu return, wow :O
  const menuBar = user ? (
    <Menu pointing secondary size="massive" color="teal">
      <Menu.Item name={user.username} active as={Link} to="/" />

      <Menu.Menu position="right">
        <Menu.Item name="logout" onClick={logout} />
      </Menu.Menu>
    </Menu>
  ) : (
    <Menu pointing secondary size="massive" color="teal">
      <Menu.Item name="home" active={activeItem === "home"} onClick={handleItemClick} as={Link} to="/" />

      <Menu.Menu position="right">
        <Menu.Item name="login" active={activeItem === "login"} onClick={handleItemClick} as={Link} to="/login" />
        <Menu.Item name="register" active={activeItem === "register"} onClick={handleItemClick} as={Link} to="/register" />
      </Menu.Menu>
    </Menu>
  );

  return menuBar;
}

export default MenuBar;
