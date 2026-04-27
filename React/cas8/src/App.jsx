import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { Galery } from "./components/Galery";
import axios from "axios";

export function App() {
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    axios("https://picsum.photos/v2/list")
      .then((res) => setPhotos(res.data))
      .catch((err) => alert);
  }, []);

  return (
    <div id="app">
      <Routes>
        <Route path="/gallery" element={<Gallery listOfPhotos={photos} />} />
      </Routes>
    </div>
  );
}
