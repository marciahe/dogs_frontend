export function validate(data, errors, setErrors) {
  const regexName = /^[\w ]{3,25}$/;

  let isValid = true;

  if (!data.name) {
    errors.name = "Indicate the name of the dog";
  } else if (!regexName.test(data.name)) {
    errors.name = "Write a valid name for the dog";
  } else {
    errors.name = "";
  }

  if (data.heightMin >= data.heightMax) {
    errors.heightMin = "Minimum height must be less than maximum height";
    isValid = false;
  } else {
    errors.heightMin = "";
  }

  if (data.weightMin >= data.weightMax) {
    errors.weightMin = "Minimum weight must be less than maximum weight";
    isValid = false;
  } else {
    errors.weightMin = "";
  }

  if (data.min_life_span >= data.max_life_span) {
    errors.min_life_span =
      "Minimum life span must be less than maximum life span";
    isValid = false;
  } else {
    errors.min_life_span = "";
  }

  if (data.temperament.length === 0) {
    errors.temperament = "At least one temperament must be selected";
    isValid = false;
  } else {
    errors.temperament = "";
  }

  setErrors({ ...errors });
  return isValid;
}
