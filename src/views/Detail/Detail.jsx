import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import style from "./Detail.module.css";
import axios from "axios";

const Detail = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [dog, setDog] = useState({});

  useEffect(() => {
    async function fetchDog() {
      const response = await axios.get(`http://localhost:3001/dogs/${id}`);
      setDog(response.data);
      setLoading(false);
    }
    fetchDog({});
  }, [id]);

  // ! La línea de la vergüenza
  const dogTemp = dog.temperament ? dog.temperament : dog.temperaments;

  return (
    <section className={style.detail}>
      {loading ? (
        <div className={style.loading}>
          <img
            className={style.doggie}
            src="https://media.tenor.com/-_q5E02A97oAAAAM/idle-pixel.gif"
            alt="Doggie bailando"
          />
          <p>Loading...</p>
        </div>
      ) : (
        <div className={style.container}>
          <h1>{dog.name}</h1>
          <div className={style.content}>
            <h3>Characteristics:</h3>
            <p>Minimum height: {dog.heightMin} cm</p>
            <p>Maximum height: {dog.heightMax} cm</p>
            <p>Minimum weight: {dog.weightMin} kg</p>
            <p>Maximum weight: {dog.weightMax} kg</p>
            <p>Life span: {dog.life_span}</p>
            <h4>Temperaments:</h4>
            {dogTemp && (
              <ul>
                {dogTemp.map((temp, index) => (
                  <li key={index}>{temp}</li>
                ))}
              </ul>
            )}
          </div>
          <div className={style.image}>
            <img
              src={
                dog.image
                  ? dog.image
                  : "https://static.vecteezy.com/system/resources/previews/000/581/279/original/vector-dog-faces-pixel-art-icons.jpg"
              }
              alt={dog.name}
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default Detail;
