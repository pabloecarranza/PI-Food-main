const initialState = {
  recipe: [],
  diets: [],
  detail: [],
  allRecipes: [],
  error: "",
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
      case "ERROR_OCURRED":
        return {
            ...state,
            error: action.payload
        }

        case "CLEAR_ERROR":
          return {
              ...state,
              error: ''
          }
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
        recipe : action.payload === "default" ? allRecipes : Filtered
      }
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
