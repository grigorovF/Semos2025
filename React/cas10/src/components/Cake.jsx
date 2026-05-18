//import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { buyCake } from "./../actions/CakeActions";

export const Cake = () => {
  const dispatch = useDispatch();
  const cakes = useSelector((state) => state.CakeReducer.cakes);

  return (
    <div id="cake">
      <h2>Cakes: {cakes}</h2>
      <button
        onClick={() => {
          dispatch(buyCake());
        }}
      >
        Buy Cake
      </button>
    </div>
  );
};
