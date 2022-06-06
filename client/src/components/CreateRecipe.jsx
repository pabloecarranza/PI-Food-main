import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { clearError, getDiets, postRecipe } from "../redux/actions";
import Styles from "../styles/CreateRecipe.module.css";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import Modal from "./Modal";
import Modal2 from "./Modal2";


function validate(input) {
  let errors = {};
  const regexTitle = /^([a-zA-Z ]+)$/i;
  const regexImg = /^https?:\/\/.*\/.*\.(png|gif|webp|jpeg|jpg)\??.*$/i;

  input.title
    ? (errors.title = "")
    : (errors.title = "You must name the recipe");
  input.summary
    ? (errors.summary = "")
    : (errors.summary = "You must provide a summary");
  input.diets.length < 1
    ? (errors.diets = "Choose at least one diet")
    : (errors.diets = "");
  if (input.title && !regexTitle.test(input.title)) {
    errors.title = "The name can't includes special characters or numbers";
  }
  if (input.image && !regexImg.test(input.image)) {
    errors.image = "This isn't a valid image address";
  }

  /*  else {
    errors.image = "";
  } */
  return errors;
}

function CreateRecipe() {
  const dispatch = useDispatch();
  const diets = useSelector((state) => state.diets);
  const error = useSelector((state) => state.error);
  const [errors, setErrors] = useState({});

  const [popUp, setPopUp] = useState(false);
  const [popUp2, setPopUp2] = useState(false);

  const clearErrors = () => {
    // manejo de errores para la ventana modal
    dispatch(clearError());
    navigate("/home/");
  };

  const clearErrors2 = () => {
    // manejo de errores para la ventana modal
    setPopUp2(false);
  };

  useEffect(() => {
    dispatch(getDiets());
  }, [dispatch]);

  const [input, setInput] = useState({
    title: "",
    summary: "",
    aggregateLikes: 0,
    healthScore: 0,
    analyzedInstructions: "",
    image: "",
    diets: [],
  });

  let navigate = useNavigate();
  const handleClickss = () => {
    navigate("/home/");
  };

  function handleSelectDiet(e) {
    setErrors(
      validate({
        ...input,
        diets: [...input.diets, e.target.value],
      })
    );
    if (!diets.includes(e.target.value)) {
      setInput((input) => ({
        ...input,
        diets: [...input.diets, e.target.value],
      }));
    }
  }

  function handleSubmit(e) {
    if (
      !input.title ||
      !input.summary ||
      !input.image ||
      input.diets.length === 0
    ) {
      setPopUp2(() => true);

      e.preventDefault();
    }

    if (input.title && input.summary && input.image && input.diets.length > 0) {
      e.preventDefault();

      dispatch(postRecipe(input));

      setInput({
        title: "",
        summary: "",
        aggregateLikes: 0,
        healthScore: 0,
        analyzedInstructions: "",
        image: "",
        diets: [],
      });
    }
  }

  function handleChange(e) {
    e.preventDefault();
    setInput((input) => ({
      ...input,
      [e.target.name]: e.target.value,
    }));
    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  }

  return (
    <div className={Styles.First}>
        <h4>Create your own Recipe here:</h4>
      <div className={Styles.supply}>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className={Styles.Second}>
            <label>Title:</label>
            <input
              type="text"
              placeholder="Plate Name here..."
              value={input.title}
              name="title"
              onChange={(e) => handleChange(e)}
            />

            <label>score</label>
            <input
              type="number"
              value={input.aggregateLikes}
              name="aggregateLikes"
              min="0"
              max="10000"
              onChange={(e) => handleChange(e)}
              />

            <label>Health Score</label>
            <input
              type="number"
              value={input.healthScore}
              name="healthScore"
              min="0"
              max="10000"
              onChange={(e) => handleChange(e)}
              />

            <label>Image:</label>
            <input
              type="text"
              placeholder="Example: https://..."
              value={input.image}
              name="image"
              onChange={(e) => handleChange(e)}
              />
            {errors.image && <p>{errors.image}</p>}
            <span>Type of Diet:</span>
            <select onChange={(e) => handleSelectDiet(e)}>
              {diets.map((d) => (
                <option value={d.name} key={d.id}>
                  {d.name}
                </option>
              ))}
            </select>
            <div className={Styles.Diets}>

            {input.diets.map((d, i) => (
              <ul key={i}>
                <p>{d}</p>
                <button>x</button>
              </ul>
            ))}
            </div>
            {errors.title && <p>{errors.title}</p>}
          </div>
          <div className={Styles.Three}>
            <label>summary:</label>
            <textarea
              name="summary"
              id=""
              cols="30"
              rows="10"
              placeholder="Complete here..."
              type="text"
              value={input.summary}
              onChange={(e) => handleChange(e)}
            ></textarea>
            {errors.summary && <p>{errors.summary}</p>}
            <label>Instruccions:</label>
            <textarea
              name="analyzedInstructions"
              id=""
              cols="30"
              rows="10"
              placeholder="Complete here..."
              type="text"
              value={input.analyzedInstructions}
              onChange={(e) => handleChange(e)}
              ></textarea>
          </div>

          {errors.diets && <p>{errors.diets}</p>}
          <br />
          <input type="submit" />
          <br />
          <br />
          <button onClick={handleClickss}>Pagina Principal</button>
        </form>
      </div>
      <div>
        {popUp2 && (
          <Modal2
            show={true}
            setShow={clearErrors2}
            message={"Complete every field!"}
          />
        )}
      </div>
    </div>
  );
}

export default CreateRecipe;
