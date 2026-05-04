export const sayHello = () => {
  return {
    type: "SAY_HELLO",
    payload: "Hi and welcome to my app",
  };
};

export const sayGoodbye = () => {
  return {
    type: "SAY_GOODBYE",
    payload: "Thanks for visiting !!!",
  };
};
