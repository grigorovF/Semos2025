import { BUY_CAKE } from "./../constants/CakeConstants";

export const buyCake = () => {
  return {
    type: BUY_CAKE,
    payload: 1,
  };
};
