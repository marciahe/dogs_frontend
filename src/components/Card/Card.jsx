import { Link } from "react-router-dom";
import style from "./Card.module.css";

const Card = (props) => {
  return (
    <div className={style.card}>
      <Link to={`/detail/${props.id}`}>
        <div
          className={style.img}
          style={{ backgroundImage: `url(${props.image})` }}
        ></div>
        {/* <p>{props.id}</p> */}
        <h3>{props.name}</h3>
        <p>
          Weight: {props.weightMin} to {props.weightMax} kg
        </p>
        <div className={style.tempsContainer}>
          {props.temperaments && (
            <ul className={style.temps}>
              {props.temperaments.map((temp) => (
                <li key={props.name + temp}>{temp}</li>
              ))}
            </ul>
          )}
        </div>
      </Link>
    </div>
  );
};

export default Card;
