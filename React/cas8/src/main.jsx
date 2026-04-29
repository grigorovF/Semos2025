import ReactDOM from "react-dom/client";
import { App } from "./App.jsx";
import { BrowserRouter as Router } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Router>
    <App />
  </Router>,
);

// Da se dodade ushte eden context za Albums (prevzemeni od https://jsonplaceholder.typicode.com vo App.jsx fajlot )
//    // i preku context preneseni i mapirani vo Album.jsx fajl, kako i da se dodade button za brishenje na selektiranata slika
// // od popup koj ke ja izbrise slikata od array-ot i ke go zatvori popup-ot isto da bide napraveno koristejki context
    
    