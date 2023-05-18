import { useState } from "react";
import { useEffect } from "react";
import style from "./MultiSelect.module.css";

const MultiSelect = ({
  options,
  selectedOptions = [],
  onChange,
  containerClassName,
}) => {
  const handleOptionChange = (event) => {
    const value = event.target.value;
    const isSelected = event.target.checked;

    if (isSelected) {
      onChange([...selectedOptions, value]);
    } else {
      onChange(selectedOptions.filter((option) => option !== value));
    }
  };

  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  const [containerRef, setContainerRef] = useState(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef && !containerRef.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [containerRef]);

  return (
    <div className={style.multiContainer} ref={(ref) => setContainerRef(ref)}>
      <label>Temperaments</label>
      <div
        className={`${style.multiSelect} ${containerClassName}`}
        onClick={toggleOpen}
      >
        <label
          className={
            selectedOptions.length === 0 ? `${style.hide}` : `${style.show}`
          }
        >
          {selectedOptions.length === 0 && "Choose 1 or more..."}
        </label>

        <div className={style.selectedOptions}>
          {selectedOptions.map((option, index) => (
            <div key={index} className={style.selectedOption}>
              {option}
            </div>
          ))}
        </div>
        <div className={style.arrow}>{isOpen ? "▲" : "▼"}</div>
      </div>
      {isOpen && (
        <div className={style.optionsList}>
          {options.map((option, index) => (
            <div key={index}>
              <label>
                <input
                  type="checkbox"
                  value={option.name}
                  checked={selectedOptions.includes(option.name)}
                  onChange={handleOptionChange}
                  className={style.checkTemps}
                />
                {option.name}
              </label>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MultiSelect;
