const initialState = {
  recipe: [],
  diets: [],
  detail: [],
  allRecipes: [],
  error: "",
};

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
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
    case "ERROR_OCURRED":
      return {
        ...state,
        error: action.payload,
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
    case "FILTER_BY_DIET":
      let allRecipes = state.allRecipes;
      const recipesApi = allRecipes.filter((r) => !r.createDB);
      const filteredRecipesApi = recipesApi.filter((r) =>
        r.diets.includes(action.payload)
      );

      const recipeDb = allRecipes.filter((r) => r.createDB);

      let c = [];
      recipeDb.forEach((e) => {
        if (
          e.hasOwnProperty("diets") &&
          e.diets.find((c) => c.name === action.payload)
        ) {
          c.push(e);
        }
      });

      let vegie = [];
      recipeDb.forEach((e) => {
        if (
          e.hasOwnProperty("diets") &&
          e.diets.find((c) => c.name === "vegetarian")
        ) {
          vegie.push(e);
        }
      });

      const filtered = c.concat(filteredRecipesApi);
      const vegetarianApi = allRecipes.filter((r) => r.vegetarian === true);
      const vegetarian = vegie.concat(vegetarianApi);
      const ternario = action.payload === "vegetarian" ? vegetarian : filtered;

      return {
        ...state,
        recipe: action.payload === "default" ? allRecipes : ternario,
      };
    case "ORDER_BY_NAME":
      let sortedArr =
        action.payload === "asc"
          ? state.recipe.sort(function (a, b) {
              if (a.title > b.title) {
                return 1;
              }
              if (b.title > a.title) {
                return -1;
              }
              return 0;
            })
          : state.recipe.sort(function (a, b) {
              if (a.title > b.title) {
                return -1;
              }
              if (b.title > a.title) {
                return 1;
              }
              return 0;
            });
      return {
        ...state,
        recipe: sortedArr,
      };
    default:
      return state;
  }
}
