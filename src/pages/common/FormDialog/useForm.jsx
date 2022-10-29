import { useState } from "react";

// A task initial state
export const initialFormValues = {
  name: "",
  description: "",
  deadline: "",
  status: "todo",
  images: [],
};

const useFormControls = (formValues, onStatusChange) => {
  // We'll update "values" as the form updates
  const [values, setValues] = useState({ ...initialFormValues, ...formValues });

  // "errors" is used to check the form for errors
  const [errors, setErrors] = useState({});

  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    // this function will check if the form values are valid
    if ("name" in fieldValues)
      temp.name = fieldValues.name ? "" : "This field is required.";

    if ("description" in fieldValues)
      temp.description = fieldValues.description
        ? ""
        : "This field is required.";

    if ("deadline" in fieldValues)
      temp.deadline = fieldValues.deadline
        ? fieldValues.deadline < new Date().toISOString().split("T")[0]
          ? "Please enter future dates"
          : ""
        : "This field is required.";

    setErrors({
      ...temp,
    });
  };

  const handleInputValue = ({ target: { value, id } }) => {
    setValues((prevState) => ({
      ...prevState,
      [id]: value,
    }));

    validate({ [id]: value });
  };

  const handleStatusChange = ({ target: { value } }) => {
    setValues((prevState) => {
      const updatedTask = {
        ...prevState,
        status: value,
      };
      if (prevState.id) {
        onStatusChange(prevState.status, updatedTask);
      }
      return updatedTask;
    });
  };

  const handleAddAttachments = ({ target: { id, files = [] } }) => {
    // adds image attachments and checks for any attachment type
    const [file] = files;
    if (file.type.startsWith("image")) {
      const image = file && URL.createObjectURL(file);
      setValues((prevState) => ({
        ...prevState,
        [id]: [...prevState.images, image],
      }));
      setErrors({ [id]: "" });
    } else {
      setErrors({
        [id]: "Please only add image formats like jpg, png",
      });
    }
  };

  const handleRemoveAttachments = (index) => {
    // removes image attachment based on index
    setValues((prevState) => {
      const images = prevState.images.filter((_, key) => key !== index);
      return {
        ...prevState,
        images,
      };
    });
  };

  const handleClearForm = () => {
    // this function will be triggered by the close button event
    setErrors({});
  };

  const formIsValid = (fieldValues = values) => {
    // this function will check if the form values and return a boolean value
    const isValid =
      fieldValues.name &&
      fieldValues.description &&
      fieldValues.deadline &&
      Object.values(errors).every((x) => x === "");

    return isValid;
  };

  return {
    handleInputValue,
    handleAddAttachments,
    handleRemoveAttachments,
    handleStatusChange,
    handleClearForm,
    formIsValid,
    errors,
    values,
    setValues,
    validate,
  };
};

export default useFormControls;
