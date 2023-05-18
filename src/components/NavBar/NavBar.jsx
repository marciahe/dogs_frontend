import { Link } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";
import style from "./NavBar.module.css";

const NavBar = () => {
  return (
    <nav className={style.nav}>
      <Link to="/">
        <h2 className={style.logo}>Doggies</h2>
      </Link>
      <Link to="/home">Doggies list</Link>
      <Link to="/create">Create one</Link>
      <SearchBar />
    </nav>
  );
};

export default NavBar;
