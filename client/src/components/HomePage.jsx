import React, { useEffect, useState } from "react";
import CardRecipe from "./CardRecipe";
import Styles from "../styles/HomePage.module.css";
import StylesNav from "../styles/Navbar.module.css";

import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { clearError, filterByDiet, getDiets, getRecipes, orderByName, setPagIndexes } from "./../redux/actions";
import Paginates from './Paginate';
import SearchBar from './SearchBar';
import Modal from './Modal';
import Modal2 from './Modal2';


function HomePage() {
  const [popUp2, setPopUp2] = useState(false)
  const dispatch = useDispatch();
  const error = useSelector(state => state.error);
  const allRecipes = useSelector((state) => state.recipe);
  const allDiets = useSelector((state) => state.diets).sort(
    function (a, b) {
      if (a < b) return -1;
      else return 1;
    }
  );


  const [currentPage, setCurrentPage] = useState(1);        // aca seteo la pagina inicial en 1
  const [recipesPerPage, /*setRecipesPerPage*/] = useState(3);// le pido paginar 9  cards en cada page
  const indexOfLastRecipe = currentPage * recipesPerPage;   
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
  const currentRecipes = allRecipes.slice(indexOfFirstRecipe, indexOfLastRecipe);

  const pagesDisplayLimit = 5;  // aca  limito la cantidad de botones de paginado que quiero mostrar
  const [maxPageDisplay, setMaxPageDisplay] = useState(5);
  const [minPageDisplay, setMinPageDisplay] = useState(1);

  
  let lastpage = [];
  for (let i = 1; i <= Math.ceil(allRecipes.length / recipesPerPage); i++) {  // la ultima pagina, esto lo uso de indice para mi nextSup
  lastpage.push(i);    
}

const clearErrors = () => {  // manejo de errores para la ventana modal
  dispatch(clearError());
}


const clearErrors2 = () => {  // manejo de errores para la ventana modal
setPopUp2(false);

}

useEffect(
  () => dispatch(setPagIndexes(indexOfLastRecipe, indexOfFirstRecipe)),
  [indexOfLastRecipe, indexOfFirstRecipe, dispatch]);

  useEffect(() => {
    setCurrentPage(1);
    setMaxPageDisplay(5);
    setMinPageDisplay(1);
  }, [allRecipes]);

  const handleSupPrev = () => {
    if (currentPage !== 1) {
      window.scrollTo( 0, 0 );// esta linea magica de codigo hermosa hace que se carge la pag. arriba de todo cuando pagino
      setCurrentPage(1);
      setMaxPageDisplay(5);
      setMinPageDisplay(1);
    }
  };

  const handleNext = () => {
    if (currentPage !== lastpage.length) {
      setCurrentPage(currentPage + 1);
      window.scrollTo( 0, 0 );
      console.log("holiiis")
      if (currentPage + 1 > maxPageDisplay) {
        setMaxPageDisplay(maxPageDisplay + pagesDisplayLimit);
        setMinPageDisplay(minPageDisplay + pagesDisplayLimit);
      }
    }
  };

  const handleSupNext = () => {
    const lastPage = lastpage.length;
    if (currentPage !== lastPage) {
      window.scrollTo( 0, 0 );
      setCurrentPage(lastPage);
      setMaxPageDisplay(lastPage);
      setMinPageDisplay(lastPage - pagesDisplayLimit + 1);
    }
  };
  
  function paginate(pageNumber) {  // seteo la pagina acorde al click en el boton, hiper simple
    window.scrollTo( 0, 0 );
    setCurrentPage(pageNumber);}

  const handlePrev = () => {
    if (currentPage !== 1) {
      window.scrollTo( 0, 0 );
      setCurrentPage(currentPage - 1);
        if (currentPage - 1 < minPageDisplay) {
        setMaxPageDisplay(maxPageDisplay - pagesDisplayLimit < 5 ? 5 : maxPageDisplay - pagesDisplayLimit);
        setMinPageDisplay(minPageDisplay - pagesDisplayLimit <= 0 ? 1 : minPageDisplay - pagesDisplayLimit);
      }
    }
  };

 

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
  setCurrentPage(1)
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
          <SearchBar 
      setPopUp2 = {setPopUp2}/>
      {popUp2 && <Modal2 show={true} setShow={clearErrors2} message={"Complete every field!"} /> }
      {error && <Modal show={true} setShow={clearErrors} message={"No results were found"} />}
      
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
    <Paginates
        paginate={paginate}
        recipesPerPage={recipesPerPage}
        allRecipes={allRecipes.length}
        
        handleNext={handleNext}
        handleSupNext={handleSupNext}
        handleSupPrev={handleSupPrev}
        handlePrev={handlePrev}
        maxPageDisplay={maxPageDisplay}
        minPageDisplay={minPageDisplay}
        currentPage={currentPage}
        
        />  
      <div className={Styles.cardZone}>
        {currentRecipes.length ? (
          currentRecipes.map((recipe) => (
            <CardRecipe
              id={recipe.id}
              image={recipe.image}
              title={recipe.title}
              diets={recipe.diets}
            />
          ))
        ) : (
          <div>
            <h1>none</h1>
          </div>
        )}
      </div>
      
    </>
  );
}

export default HomePage;
