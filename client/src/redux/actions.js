import { axios } from "axios";

export function getRecipes() {
  return async function (dispatch) {
    let json = await axios.get("http://localhost:3001/recipe");
    return dispatch({
      type: "GET_RECIPES",
      payload: json.data,
    });
  };
}
