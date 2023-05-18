import CardsContainer from "../../components/CardsContainer/CardsContainer";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  // getDogs,
  filterByTemps,
  filterByCreated,
  orderBy,
  setCurrentPage,
} from "../../redux/actions";
import style from "./Home.module.css";

const Home = () => {
  const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(getDogs());
  // }, [dispatch]);

  const [temperamentsOptions, setTemperamentsOptions] = useState([]);

  useEffect(() => {
    async function fetchTemperaments() {
      const response = await fetch("http://localhost:3001/temperaments");
      const data = await response.json();
      setTemperamentsOptions(
        data.map((temperament, index) => ({
          name: temperament.name,
          key: index,
        }))
      );
    }
    fetchTemperaments();
  }, []);

  const [selectedTemperament, setSelectedTemperament] = useState([]);

  const handleTemperamentChange = (event) => {
    const selectedTemp = event.target.value;
    setSelectedTemperament(selectedTemp);
    dispatch(filterByTemps([selectedTemp]));
    dispatch(setCurrentPage(1));
  };

  const [selectedCreated, setSelectedCreated] = useState("");

  const handleCreatedChange = (event) => {
    const selectedCreated = event.target.value;
    setSelectedCreated(selectedCreated);
    dispatch(filterByCreated(selectedCreated));
    dispatch(setCurrentPage(1));
  };

  const [selectedOrder, setSelectedOrder] = useState("");

  const handleOrderingChange = (event) => {
    const orderSelected = event.target.value;
    setSelectedOrder(orderSelected);
    dispatch(orderBy(orderSelected));
  };

  return (
    <section className={style.home}>
      <h1>Know all the Doggies!</h1>
      <div className={style.filters}>
        <select value={selectedTemperament} onChange={handleTemperamentChange}>
          <option value="">Filter by temperament</option>
          {temperamentsOptions.map((option) => (
            <option key={option.key} value={option.name}>
              {option.name}
            </option>
          ))}
        </select>

        <select value={selectedCreated} onChange={handleCreatedChange}>
          <option value="All">Created by...</option>
          <option key="1" value="user">
            Created by User
          </option>
          <option key="2" value="api">
            Original Doggies
          </option>
        </select>

        <select value={selectedOrder} onChange={handleOrderingChange}>
          <option value="">Order by...</option>
          <option key="1" value="nameAsc">
            Breed name ascending
          </option>
          <option key="2" value="nameDesc">
            Breed name descending
          </option>
          <option key="3" value="weightAsc">
            Weight ascending
          </option>
          <option key="4" value="weightDesc">
            Weight descending
          </option>
        </select>
      </div>

      <CardsContainer />
    </section>
  );
};

export default Home;
