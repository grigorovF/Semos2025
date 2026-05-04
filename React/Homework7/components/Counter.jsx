import { useSelector, useDispatch } from "react-redux";
import { increment, decrement } from "../actions/CounterActions";

export const Counter = () => {
  const dispatch = useDispatch();
  const count = useSelector((state) => state.CounterReducer.count);

  return (
    <div>
      <h2>Counter: {count}</h2>

      <button onClick={() => dispatch(increment())}>+</button>

      <button onClick={() => dispatch(decrement())}>-</button>
    </div>
  );
};
