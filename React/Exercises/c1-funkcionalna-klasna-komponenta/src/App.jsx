import {Goodbye} from './components/Goodbye-FukcionalnaKomponenta';
import {Hello} from './components/Hello-KlasnaKomponenta';

export function App(){
  const broj = 1;
  var str = 'abv';
  return(
    <>
      <Hello/>
      <h2>Text vo app</h2>
      <p>Prikazan broj e brojot {broj}</p>
      <Goodbye/>
      <h5>Frazata e {str}</h5>
    </>
  )
}