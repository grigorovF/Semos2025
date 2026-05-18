import { BUY_CAKE } from "./../constants/CakeConstants";
const initialState = {
  cakes: 10,
};

const CakeReducer = (state = initialState, action) => {
  switch (action.type) {
    case BUY_CAKE:
      return {
        ...state,
        cakes: state.cakes - action.payload, // 10 - 1
      };

    default:
      return state;
  }
};

export default CakeReducer;
