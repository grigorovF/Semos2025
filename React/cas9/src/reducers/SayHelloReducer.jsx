const initialState = {
    greeting: "Hi",
    goodbye: 'Bye'
}

const SayHelloReducer = (state = initialState, action) => {

    switch (action.type) {
      case "SAY_HELLO":
        return {
          ...state,
          greeting: action.payload,
        };

      case "SAY_GOODBYE":
        return {
          ...state,
          goodbye: action.payload,
        };

      default:
        return state;
    }
}

export default SayHelloReducer;