import {Cars} from './components/Cars'
import {Comments} from './components/Comments'

export function App() {

  let comments = [
    { id: 0, author: "Filip", content: "Comment 1" },
    { id: 1, author: "Simona", content: "Comment 2" },
    { id: 2, author: "Marko", content: "Email in Spam" },
    { id: 3, author: "Marko", content: "Comment 3" },
  ];

  let registracija = [
    { grad: { naselba: "N1", ulica: "Ul.1" }, oznaka: "SK-0000-AB" },
    { grad: { naselba: "N2", ulica: "Ul.2" }, oznaka: "GV-0000-AB" },
    { grad: { naselba: "N3", ulica: "Ul.3" }, oznaka: "TE-0000-AB" },
  ];
  let cars = [
    { brand: "Ford", model: "Fiesta", year: 2010, plates: registracija[0] },
    { brand: "Opel", model: "Astra", year: 2020, plates: registracija[1] },
    { brand: "VW", model: "Polo", year: 2025, plates: registracija[2] },
  ];
  return (
    <div>
      <h2>App</h2>
      <br/>
      <h3>Cars: </h3>
      <Cars vozila={cars}/>
      <Comments komentari={comments}/>
    </div>
  );
}
