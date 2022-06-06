import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { clearDetails, getDetail } from "../redux/actions";
import Styles from '../styles/DetailRecipe.module.css'
function DetailRecipe() {
  const detail = useSelector((state) => state.detail);
  const dispatch = useDispatch();


  let navigate = useNavigate();
  const handleClickss = () => {
    navigate("/home/");
  };


  const { id } = useParams();
  console.log(detail);

  useEffect(() => {
    dispatch(getDetail(id));
  }, []);



   useEffect(() => {
    return () => {
      dispatch(clearDetails());
    };
  }, [dispatch]);
  
  console.log(detail.summary);

  return (
    <div className={Styles.father}>
      <div className={Styles.sun}>
        <img src={detail.image} alt="" />
        <h3>Recipe Name</h3>
        <span>{detail.title}</span>
        <h3>Aggregate Likes</h3>
        <span>{detail.aggregateLikes}</span>
        <h3>health Score</h3>
        <span>{detail.healthScore}</span>
        <h3>Type od Diets:</h3>
         {detail.diets ? (
           <ul>
            {detail.diets?.map((p) => (
              <li key={p.i}>{p.name}</li>
              ))}
          </ul>
        ) : (
          <h3>not available</h3>
          )} 
      </div>
      <div className={Styles.sun}>
        <h3>Summary</h3>
        <span>{detail.summary?.replace(/<[^>]*>?/g, "")}</span>
        <div className={Styles.ins}>

        <h3>Analized Instructions</h3>
         {detail.analyzedInstructions ? (
           <ul>
            {detail.analyzedInstructions[0]?.steps.map((p) => (
              <li key={p.number}>{p.step}</li>
              ))}
          </ul>
        ) : (
          <h3>not available</h3>
          )} 
          </div>
        <button onClick={handleClickss}>Pagina Principal</button>
      </div>
    </div>
  );
}

export default DetailRecipe;

