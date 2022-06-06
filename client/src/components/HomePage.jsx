import React, { useEffect, useState } from "react";
import CardRecipe from "./CardRecipe";
import Styles from "../styles/HomePage.module.css";
import StylesNav from "../styles/Navbar.module.css";

import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { filterByDiet, getDiets, getRecipes, orderByName } from "./../redux/actions";


function HomePage() {

  const dispatch = useDispatch();
  const allRecipes = useSelector((state) => state.recipe);
  const allDiets = useSelector((state) => state.diets).sort(
    function (a, b) {
      if (a < b) return -1;
      else return 1;
    }
  );

  const [sort, setSort] = useState("")

  useEffect(() => {
    dispatch(getRecipes());
    dispatch(getDiets());
  }, [dispatch]);


function handleSort(e){
   e.preventDefault();
  dispatch(orderByName(e.target.value))
  setSort(`Ordenado ${e.target.value}`)
}

function handleFilteredByDiets(e){
  e.preventDefault();
  dispatch(filterByDiet(e.target.value));
}


  return (
    <>
      <div className={StylesNav.navbar}>
      <div className={StylesNav.navb}>
        <Link to="/">
          <h1>Food Recipes</h1>
        </Link>
        <div className={StylesNav.inputHome}>
          <div>
            <input type="text" placeholder="Search a recipe..." />
            <button type="submit">
              <span>Search</span>
            </button>
          </div>
          <div>
            <select onChange={(e) => handleSort(e)}>
              <option value="none">Select Order</option>
              <option value="asc">Order A - Z</option>
              <option value="des">Order Z - A</option>
            </select>
            <select onChange={(e)=> handleFilteredByDiets(e)}>
              <option value="default">All Diets</option>
              {allDiets.map((diet) => {
                return (
                  <option value={diet.name} key={diet.id}>
                    {diet.name}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
      </div>

      <nav className={StylesNav.nav}>
        <NavLink to="/home">
          <h3>Home</h3>
        </NavLink>
        <NavLink to="/newrecipe">
          <h3>Create Recipe</h3>
        </NavLink>
        <NavLink to="/about">
          <h3>About</h3>
        </NavLink>
      </nav>
    </div>
      <div className={Styles.cardZone}>
        {allRecipes.length ? (
          allRecipes.map((recipe) => (
            <CardRecipe
              id={recipe.id}
              image={recipe.image}
              title={recipe.title}
              diets={recipe.diets}
            />
          ))
        ) : (
          <div>
            <h1>Loading...</h1>
          </div>
        )}
      </div>
    </>
  );
}

export default HomePage;
