import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect, useRef } from "react";
import { getDogs } from "../../redux/actions";
import { Link } from "react-router-dom";
import style from "./SearchBar.module.css";

export default function SearchBar() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getDogs());
  }, [dispatch]);

  const dogs = useSelector((state) => state.dogs);

  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const searchRef = useRef(null);

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    const getFilteredDogs = () => {
      const filteredDogs = dogs.filter((dog) =>
        dog.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSearchResults(filteredDogs);
    };
    getFilteredDogs();
  }, [searchTerm, dogs]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setSearchTerm("");
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [searchRef]);

  return (
    <div className={style.searchBar} ref={searchRef}>
      <input
        className={style.searchBox}
        type="text"
        value={searchTerm}
        onChange={handleChange}
        placeholder="Boxer, Beagle..."
      />
      <span className={style.searchIcon}>🔍</span>

      {searchTerm.length > 1 && (
        <ul className={style.results}>
          {searchResults.map((dog) => (
            <Link to={`/detail/${dog.id}`} key={dog.id}>
              <li>{dog.name}</li>
            </Link>
          ))}
        </ul>
      )}
    </div>
  );
}
