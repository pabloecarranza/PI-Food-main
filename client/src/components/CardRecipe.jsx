import React from "react";
import { Link } from "react-router-dom";

import Styles from "../styles/CardRecipe.module.css";

function CardRecipe({ diets, image, title, id }) {
  const newD = diets
    .map((diets) => {
      return diets.name;
    })
    .join(', ');

  return (
    <>
      <div className={Styles.card}>
        <Link to={"/recipe/" + id}>
        <h1>{title}</h1>
        </Link>
        <img src={image} alt="" />
        <h1>{newD}</h1>
      </div>
    </>
  );
}

export default CardRecipe;
