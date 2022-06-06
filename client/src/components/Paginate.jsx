import React from "react";
import Styles from '../styles/Paginate.module.css'


export default function Paginates({currentPage, 
   recipesPerPage, allRecipes, paginate, handleNext,
    handleSupNext,handleSupPrev, handlePrev, maxPageDisplay,
     minPageDisplay}) {
  
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(allRecipes / recipesPerPage); i++) {
    pageNumbers.push(i);
    
  }
  
  return (
    <nav >
      {pageNumbers.length === 0 ? (
        <p></p>
      ) : (
        <nav className={Styles.btnPag}>
          <button className={Styles.pgB} onClick={handleSupPrev}>First Page</button>
          <button className={Styles.pgB} onClick={handlePrev}>{"<"}</button>
          {pageNumbers?.map(number => {
            if (number <= maxPageDisplay && number >= minPageDisplay) {
              return (
                <button
                  key={number}
                  id={number}
                  className={currentPage === number ? "active" : null}
                  onClick={() => paginate(number)}
                >
                  {number}
                </button>
              );
            } else {
              return null;
            }
          })}
          <button className={Styles.pgB} disabled={currentPage === Math.ceil(allRecipes / recipesPerPage)}
          onClick={handleNext}>{">"}</button>
          <button className={Styles.pgB} disabled={currentPage === Math.ceil(allRecipes / recipesPerPage)}
           onClick={handleSupNext}>Last Page</button>
        </nav>
      )}
    </nav>
  );
}

