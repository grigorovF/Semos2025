import { useContext } from "react";
import { AlbumsContext } from "../utils/AlbumsContext";

export const Albums = () => {
  const { albums } = useContext(AlbumsContext);

  return (
    <div>
      <h2>Albums</h2>
      <ul>
        {albums.map((a) => (
          <li key={a.id}>{a.title}</li>
        ))}
      </ul>
    </div>
  );
};