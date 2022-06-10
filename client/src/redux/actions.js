const { default: axios } = require("axios");

//me traigo todas las recetas
export function getRecipes() {
  return async function (dispatch) {
    let json = await axios.get("http://localhost:3001/recipe");
    return dispatch({
      type: "GET_RECIPES",
      payload: json.data,
    });
  };
}

//me traigo los nombre de las dietas
export function getDiets() {
  return async function (dispatch) {
    let json = await axios.get("http://localhost:3001/diet");
    return dispatch({
      type: "GET_DIETS",
      payload: json.data,
    });
  };
}

export const setPagIndexes = (indexOfLastRecipe, indexOfFirstRecipe) => {
  return { type: "PAG_INDEXES", payload: { indexOfLastRecipe, indexOfFirstRecipe } };
};

export function clearDetails(){
  return {
    type: "CLEAR_DETAILS",
  }
}

export function orderByName(payload) {
  return {
    type: "ORDER_BY_NAME",
    payload,
  };
}

export function getTypesOfDiet() {
  return async function (dispatch) {
    let json = await fetch("http://localhost:3001/types").then((response) => {
      if (!response.ok) throw Error(response.status);
      return response.json();
    });
    return dispatch({
      type: "GET_TYPES_OF_DIET",
      payload: json,
    });
  };
}

export function getDetail(id){
  return async function(dispatch){
    try {
      let json = await axios.get("http://localhost:3001/recipe/" + id);
      return dispatch({
        type: "GET_DETAIL",
        payload: json.data,
      })
    } catch (error) {
      
    }
  }
}

export function filterByDiet(diets) {
  return {
    type: "FILTER_BY_DIET",
    payload: diets,
  };
}

export function postRecipe(payload){
  return async function(){
    try {
      const json = await axios.post("http://localhost:3001/recipe", payload);
      return {
        type: "POST_RECIPE",
        json,
      };
    } catch (error) {

    }
  };
}

export function getNameRecipe(name){
  return async function(dispatch){
      const json = await axios.get(`http://localhost:3001/recipe/name/?name=${name}`);
      return dispatch({
        type: "GET_NAME_RECIPE",
        payload: json.data,
      });
  }
}

export function clearError()  {
  return {
      type: "CLEAR_ERROR"
  }
}

export function orderByScoreLikes(payload) {
  return {
    type: "ORDER_BY_SCORE_LIKES",
    payload,
  };
}