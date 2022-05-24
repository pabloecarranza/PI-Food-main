const initialState = {
  recipe: [],
};

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_RECIPES":
      return {
        ...state,
        recipe: action.payload,
      };
    default:
      return state;
  }
}
