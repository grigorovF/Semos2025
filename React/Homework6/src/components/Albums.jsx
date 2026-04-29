import { useContext } from "react";
import { AlbumsContext } from "../utils/AlbumsContext";

export const Albums = () => {
  const { albums } = useContext(AlbumsContext);

  if (!albums || albums.length === 0) {
    return <h2>Loading...</h2>;
  }

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