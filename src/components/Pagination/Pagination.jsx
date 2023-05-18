import { setCurrentPage } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import style from "./Pagination.module.css";

const Pagination = ({ totalDogs, dogsPerPage }) => {
  const dispatch = useDispatch();
  const currentPage = useSelector((state) => state.currentPage);
  const visiblePages = 5;

  let pages = [];
  for (let i = 1; i <= Math.ceil(totalDogs / dogsPerPage); i++) {
    pages.push(i);
  }

  const handlePrevClick = () => {
    if (currentPage > 1) {
      dispatch(setCurrentPage(currentPage - 1));
    }
  };

  const handleNextClick = () => {
    if (currentPage < pages.length) {
      dispatch(setCurrentPage(currentPage + 1));
    }
  };

  const handleFirstClick = () => {
    dispatch(setCurrentPage(1));
  };

  const handleLastClick = () => {
    dispatch(setCurrentPage(pages.length));
  };

  const handlePageClick = (page) => {
    dispatch(setCurrentPage(page));
  };

  const getPageRange = () => {
    const half = Math.floor(visiblePages / 2);
    let start = currentPage - half;
    let end = currentPage + half;
    if (start < 1) {
      start = 1;
      end = visiblePages;
    }
    if (end > pages.length) {
      end = pages.length;
      start = pages.length - visiblePages + 1;
    }
    return { start, end };
  };

  const { start, end } = getPageRange();
  const visiblePageNumbers = pages.slice(start - 1, end);

  return (
    <div className={style.pagination}>
      <button onClick={handleFirstClick} disabled={currentPage === 1}>
        First
      </button>
      <button onClick={handlePrevClick} disabled={currentPage === 1}>
        Prev
      </button>
      {visiblePageNumbers.map((page, index) => {
        return (
          <button
            key={index}
            onClick={() => handlePageClick(page)}
            className={page === currentPage ? style.active : style.inactive}
          >
            {page}
          </button>
        );
      })}
      <button onClick={handleNextClick} disabled={currentPage === pages.length}>
        Next
      </button>
      <button onClick={handleLastClick} disabled={currentPage === pages.length}>
        Last
      </button>
    </div>
  );
};

export default Pagination;
