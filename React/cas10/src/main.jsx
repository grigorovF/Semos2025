//import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Cake } from "./components/Cake.jsx";
import { Provider } from "react-redux";
import store from "./store.jsx";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <Router>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="/cake" element={<Cake />} />
        </Route>
      </Routes>
    </Router>
  </Provider>,
);


// Za Domashna: Da se zamenat buttons za buy cake so input field kade ke se vnese brojka i ke se odzeme toj broj na torti od vkupniot 
// (vnimavajte na validacii i vnes vo input),na isti princip da se reshi i restock na cakes so input koj ke dodava na tekovniot broj na 
// torti kako i komentarot koj bese ostaven vo zadacata za resavanje na broj na torti so message namesto disabled buttons. 
// Dopolnitelno da se napravi uste eden redux cycle za get na nekoi od podatocite od https://json.placeholder.typicode.com

