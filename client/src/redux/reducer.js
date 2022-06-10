const initialState = {
  recipe: [],
  diets: [],
  detail: [],
  allRecipes: [],
  indexOfFirstRecipe: 0,
  indexOfLastRecipe: 3,
};

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "PAG_INDEXES":
      return {
        ...state,
        indexOfFirstRecipe: action.payload.indexOfFirstRecipe,
        indexOfLastRecipe: action.payload.indexOfLastRecipe,
      };
    case "ORDER_BY_SCORE_LIKES":
      let orderedRecipes =
        action.payload === "Desc"
          ? state.recipe.sort((a, b) => a.aggregateLikes - b.aggregateLikes)
          : state.recipe.sort((a, b) => b.aggregateLikes - a.aggregateLikes);
      return {
        ...state,
        recipe: action.payload === "All" ? state.recipe : orderedRecipes,
      };
    case "GET_RECIPES":
      return {
        ...state,
        recipe: action.payload,
        allRecipes: action.payload,
      };
    case "GET_DIETS":
      return {
        ...state,
        diets: action.payload,
      };
    case "GET_DETAIL":
      return {
        ...state,
        detail: action.payload,
      };
    case "GET_NAME_RECIPE":
      return {
        ...state,
        recipe: action.payload,
      };
    
    case "POST_RECIPE":
      return {
        ...state,
      };
    case "CLEAR_DETAILS":
      return {
        ...state,
        detail: [],
      };
    case "CLEAR_ERROR":
      return {
        ...state,
        error: "",
      };
    case "FILTER_BY_DIET":
      let allRecipes = state.allRecipes;

      let Filtered = [];

      allRecipes.forEach((e) => {
        if (
          e.hasOwnProperty("diets") &&
          e.diets.find((c) => c.name === action.payload)
        ) {
          Filtered.push(e);
        }
      });

      return {
        ...state,
        recipe: action.payload === "default" ? allRecipes : Filtered,
      };

    case "ORDER_BY_NAME":
      let sortedRecipes =
        action.payload === "A-Z"
          ? state.recipe.sort(function (a, b) {
              if (a.title.toLowerCase() > b.title.toLowerCase()) {
                return 1;
              }
              if (b.title.toLowerCase() > a.title.toLowerCase()) {
                return -1;
              }
              return 0;
            })
          : state.recipe.sort(function (a, b) {
              if (a.title.toLowerCase() < b.title.toLowerCase()) {
                return 1;
              }
              if (b.title.toLowerCase() < a.title.toLowerCase()) {
                return -1;
              }
              return 0;
            });
      return {
        ...state,
        recipe: action.payload === "default" ? state.recipe : sortedRecipes,
      };
    default:
      return state;
  }
}
