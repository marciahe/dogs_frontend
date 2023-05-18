import { GET_DOGS } from "./actions";
import { FILTER_TEMPS } from "./actions";
import { FILTER_CREATED } from "./actions";
import { ORDER } from "./actions";
import { CURRENT_PAGE } from "./actions";

const initialState = {
  dogs: [],
  allDogs: [],
  filterTemp: null,
  filterCreated: null,
  currentPage: 1,
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case CURRENT_PAGE:
      return { ...state, currentPage: action.payload };

    case GET_DOGS:
      return { ...state, dogs: action.payload, allDogs: action.payload };

    case ORDER:
      const order = action.payload;
      const ordered = [...state.dogs];

      if (order === "nameAsc") {
        ordered.sort((a, b) => a.name.localeCompare(b.name));
      } else if (order === "nameDesc") {
        ordered.sort((a, b) => b.name.localeCompare(a.name));
      } else if (order === "weightAsc") {
        ordered.sort((a, b) => a.weightMax - b.weightMax);
      } else if (order === "weightDesc") {
        ordered.sort((a, b) => b.weightMax - a.weightMax);
      }

      return {
        ...state,
        dogs: ordered,
      };

    case FILTER_TEMPS:
      const temperament = action.payload;
      state.filterTemp = temperament;
      let dogsWithTemps = state.allDogs;

      if (state.filterCreated) {
        const flag = state.filterCreated === "user" ? true : false;
        dogsWithTemps = dogsWithTemps.filter(
          (dog) => dog.createdByUser === flag
        );
      }
      if (state.filterTemp) {
        dogsWithTemps = dogsWithTemps.filter((dog) =>
          temperament.some((temp) => dog.temperaments.includes(temp))
        );
      }
      return {
        ...state,
        dogs: dogsWithTemps,
        filterTemp: temperament,
      };

    case FILTER_CREATED:
      const flag = action.payload === "user" ? true : false;
      let filteredDogs = state.allDogs;
      if (state.filterTemp) {
        const temp = state.filterTemp;
        filteredDogs = filteredDogs.filter((dog) =>
          temp.some((t) => dog.temperaments.includes(t))
        );
      }
      if (action.payload === "All") {
        return {
          ...state,
          dogs: filteredDogs,
          filterCreated: null,
        };
      } else {
        filteredDogs = filteredDogs.filter((dog) => dog.createdByUser === flag);
        return {
          ...state,
          dogs: filteredDogs,
          filterCreated: action.payload,
        };
      }

    default:
      return { ...state };
  }
};

export default rootReducer;
