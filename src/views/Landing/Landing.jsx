import SearchBar from "../../components/SearchBar/SearchBar";
import { Link } from "react-router-dom";
import style from "./Landing.module.css";

const Landing = () => {
  return (
    <section className={style.landing}>
      <div className={style.container}>
        <img
          className={style.doggie}
          src="https://media.tenor.com/-_q5E02A97oAAAAM/idle-pixel.gif"
          alt="Doggie bailando"
        />
        <h1>Doggies</h1>
        <h2>
          Looking for a best friend? <br /> Find it here:
        </h2>
        <SearchBar></SearchBar>
        <Link to="home">
          <button className={style.btnToHome}>
            Take a look at all the Doggies
          </button>
        </Link>
      </div>
    </section>
  );
};

export default Landing;
