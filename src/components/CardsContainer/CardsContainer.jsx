import Card from "../Card/Card";
import Pagination from "../Pagination/Pagination.jsx";
import { useSelector } from "react-redux";
// import { useState } from "react";
import style from "./CardsContainer.module.css";

const CardsContainer = () => {
  const dogsPerPage = 8;

  const currentPage = useSelector((state) => state.currentPage);
  const dogs = useSelector((state) => state.dogs);
  const filters1 = useSelector((state) => state.filterTemp);
  const filters2 = useSelector((state) => state.filterCreated);

  const lastDogIndex = currentPage * dogsPerPage;
  const firstDogIndex = lastDogIndex - dogsPerPage;
  const currentDogs = dogs.slice(firstDogIndex, lastDogIndex);

  if (dogs.length === 0 && !filters1 && dogs.length === 0 && !filters2) {
    return (
      <div className={style.loading}>
        <img
          className={style.doggie}
          src="https://media.tenor.com/-_q5E02A97oAAAAM/idle-pixel.gif"
          alt="Doggie bailando"
        />
        <p>Loading...</p>
      </div>
    );
  }

  return dogs && currentDogs.length === 0 ? (
    <div className={style.loading}>
      <img
        className={style.doggie}
        src="https://thumb.ac-illust.com/9e/9e8e3b43134b3869f8d796ccea7c3f45_t.jpeg"
        alt="Doggie poop"
      />
      <p>
        Sorry! <br />
        There are no Doggies with those filters
      </p>
    </div>
  ) : (
    <main className={style.main}>
      {currentDogs.map((dog) => {
        return (
          <Card
            key={dog.id}
            id={dog.id}
            name={dog.name}
            image={
              dog.image
                ? dog.image
                : "https://static.vecteezy.com/system/resources/previews/000/581/279/original/vector-dog-faces-pixel-art-icons.jpg"
            }
            weightMin={dog.weightMin}
            weightMax={dog.weightMax}
            temperaments={dog.temperaments}
          />
        );
      })}
      {currentDogs.length === 0 && (
        <div className={style.noResults}>
          <p>No hay perros con esos filtros</p>
        </div>
      )}

      <Pagination totalDogs={dogs.length} dogsPerPage={dogsPerPage} />
    </main>
  );
};

export default CardsContainer;
