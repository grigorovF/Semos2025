import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import axios from "axios";
import { Nav } from "./components/Nav";
import { Home } from "./components/Home";
import { Gallery } from "./components/Gallery";
import { Albums } from "./components/Albums";
import { GalleryContext } from "./utils/GalleryContext";
import { AlbumsContext } from "./utils/AlbumsContext";
import "./css/App.css";

export function App() {
  const [photos, setPhotos] = useState([]);
  const [selectedImage, setSelectedImage] = useState("");
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    axios("https://picsum.photos/v2/list")
    .then((res) => setPhotos(res.data));

    axios("https://jsonplaceholder.typicode.com/albums")
    .then((res) =>setAlbums(res.data));
  }, []);

  function deleteImage() {
    setPhotos((photo) => photo.filter((p) => p.download_url !== selectedImage));
    setSelectedImage("");
  }

  return (
    <div id="app">
      <Nav />

      <GalleryContext.Provider
        value={{ selectedImage, setSelectedImage, deleteImage }}
      >
        <AlbumsContext.Provider value={{ albums }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/gallery"
              element={<Gallery listOfPhotos={photos} />}
            />
            <Route path="/albums" element={<Albums />} />
          </Routes>
        </AlbumsContext.Provider>
      </GalleryContext.Provider>
    </div>
  );
}
