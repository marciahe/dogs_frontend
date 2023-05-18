import axios from "axios";

export const GET_DOGS = "GET DOGS";
export const FILTER_TEMPS = "FILTER_TEMPS";
export const FILTER_CREATED = "FILTER_CREATED";
export const ORDER = "ORDER";
export const CURRENT_PAGE = "CURRENT_PAGE";

export const getDogs = () => {
  const endpoint = "http://localhost:3001/dogs";

  return async function (dispatch) {
    try {
      const { data } = await axios.get(endpoint);
      dispatch({
        type: GET_DOGS,
        payload: data,
      });
    } catch (error) {
      console.error(error.message);
      alert("There was an error trying to show the doggies");
    }
  };
};

export const filterByTemps = (temperament) => {
  return {
    type: FILTER_TEMPS,
    payload: temperament[0] === "" ? null : temperament,
  };
};

export const filterByCreated = (created) => {
  return {
    type: FILTER_CREATED,
    payload: created,
  };
};

export const orderBy = (order) => {
  return {
    type: ORDER,
    payload: order,
  };
};

export const setCurrentPage = (page) => {
  return {
    type: CURRENT_PAGE,
    payload: page,
  };
};
