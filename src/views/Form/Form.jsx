import { useState, useEffect } from "react";
import axios from "axios";
import { validate } from "./validations.js";
import { useHistory } from "react-router-dom";
import MultiSelect from "../../components/MultiSelect/MultiSelect";
import style from "./Form.module.css";

const Form = () => {
  const [form, setForm] = useState({
    name: "",
    heightMin: null,
    heightMax: null,
    weightMin: null,
    weightMax: null,
    life_span_min: null,
    life_span_max: null,
    temperament: [],
  });

  const [errors, setErrors] = useState({
    name: "",
    heightMin: "",
    heightMax: "",
    weightMin: "",
    weightMax: "",
    life_span_min: "",
    life_span_max: "",
    temperament: "",
  });

  const [temperamentsOptions, setTemperamentsOptions] = useState([]);

  useEffect(() => {
    async function fetchTemperaments() {
      try {
        const response = await axios.get("http://localhost:3001/temperaments");
        setTemperamentsOptions(
          response.data.map((temperament, index) => ({
            name: temperament.name,
            key: index,
          }))
        );
      } catch (error) {
        console.log("Error fetching temperaments:", error);
      }
    }
    fetchTemperaments();
  }, []);

  const changeHandler = (event) => {
    const property = event.target.name;
    let value = event.target.value;

    if (property === "temperament") {
      const selectedTemperaments = temperamentsOptions.filter((temperament) =>
        form.temperament.includes(temperament.name)
      );
      value = selectedTemperaments;
    }

    setForm({ ...form, [property]: value });

    validate({ ...form, [property]: value }, errors, setErrors);
  };

  const history = useHistory();

  const submitHandler = async (event) => {
    event.preventDefault();

    const isValid = validate(form, errors, setErrors);

    const requiredFields = [
      "name",
      "heightMin",
      "heightMax",
      "weightMin",
      "weightMax",
      "life_span_min",
      "life_span_max",
      "temperament",
    ];
    const missingFields = requiredFields.filter((field) => !form[field]);
    if (missingFields.length > 0 || !isValid) {
      console.log(`Missing required fields: ${missingFields.join(", ")}`);
      return;
    }
    try {
      const response = await axios.post("http://localhost:3001/dogs", form);
      console.log("Dog created successfully:", response.data);
      const newDogId = response.data.id;
      history.push(`/detail/${newDogId}`);
    } catch (error) {
      console.log("Error creating dog:", error);
    }
  };

  return (
    <section className={style.formContainer}>
      <h1>Create a doggie</h1>
      <form onSubmit={submitHandler} className={style.form}>
        <div>
          <label>Breed name</label>
          <input
            type="text"
            value={form.name}
            onChange={changeHandler}
            name="name"
            placeholder="Pit Bull"
            className={errors.name ? `${style.warning}` : ""}
          ></input>
          <p className={style.danger}>{errors.name}</p>
        </div>

        <div>
          <label>Minimum height</label>
          <input
            type="number"
            value={form.heightMin}
            onChange={changeHandler}
            name="heightMin"
            placeholder="0"
            className={errors.heightMin ? `${style.warning}` : ""}
          ></input>
          <p className={style.danger}>{errors.heightMin}</p>
        </div>
        <div>
          <label>Maximum height</label>
          <input
            type="number"
            value={form.heightMax}
            onChange={changeHandler}
            name="heightMax"
            placeholder="0"
            className={errors.heightMax ? `${style.warning}` : ""}
          ></input>
          <p className={style.danger}>{errors.heightMax}</p>
        </div>

        <div>
          <label>Minimum weight</label>
          <input
            type="number"
            value={form.weightMin}
            onChange={changeHandler}
            name="weightMin"
            placeholder="0"
            className={errors.weightMin ? `${style.warning}` : ""}
          ></input>
          <p className={style.danger}>{errors.weightMin}</p>
        </div>
        <div>
          <label>Maximum weight</label>
          <input
            type="number"
            value={form.weightMax}
            onChange={changeHandler}
            name="weightMax"
            placeholder="0"
            className={errors.weightMax ? `${style.warning}` : ""}
          ></input>
          <p className={style.danger}>{errors.weightMax}</p>
        </div>

        <div>
          <label>Minimum life span</label>
          <input
            type="number"
            value={form.life_span_min}
            onChange={changeHandler}
            name="life_span_min"
            placeholder="0"
            className={errors.life_span_min ? `${style.warning}` : ""}
          ></input>
          <p className={style.danger}>{errors.life_span_min}</p>
        </div>
        <div>
          <label>Maximum life span</label>
          <input
            type="number"
            value={form.life_span_max}
            onChange={changeHandler}
            name="life_span_max"
            placeholder="0"
            className={errors.life_span_max ? `${style.warning}` : ""}
          ></input>
          <p className={style.danger}>{errors.life_span_max}</p>
        </div>

        <MultiSelect
          options={temperamentsOptions}
          selectedOptions={form.temperament}
          onChange={(selectedOptions) =>
            setForm({ ...form, temperament: selectedOptions })
          }
          containerClassName={errors.temperament ? `${style.warning}` : ""}
        />
        <p className={style.danger}>{errors.temperament}</p>

        <button type="submit" className={style.sendDoggie}>
          Submit my Doggie
        </button>
      </form>
    </section>
  );
};

export default Form;
