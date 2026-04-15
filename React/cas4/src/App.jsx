import React,{useState,useEffect} from 'react';
import { Domashna } from './components/Domashna';
import {Login} from './components/Login';
import "../src/components/css/App.css";
// Домашна: da se prikaze vo dopolnitelen fajl lista od filmovi (minimum 5 po vash izbor)
// izdefinirana vo app so atributi {name,date,genre plot,imdbLink,imgUrl}
// listata na atributi prikaz i slika za filmot (slikata ne mora da bide od imdb),
// imdb.com e stranata za filmovite

// const filmovi = [
//   {name:'The Dark Knight',releaseDate:2008,genre:'Crime,Drama,Action',plot:'When a menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman, James Gordon and Harvey Dent must work together to put an end to the madness',imdbLink:'https://www.imdb.com/title/tt0468569/?ref_=nv_sr_srsg_0_tt_7_nm_1_in_0_q_the%20dark',imgUrl:'https://upload.wikimedia.org/wikipedia/en/thumb/1/1c/The_Dark_Knight_%282008_film%29.jpg/250px-The_Dark_Knight_%282008_film%29.jpg'},
//   {name:'Back to the Future',releaseDate:1985,genre:'Sci-Fi,Comedy,Adventure',plot:'Marty McFly, a 17-year-old high school student, is accidentally sent 30 years into the past in a time-traveling DeLorean invented by his close friend, the maverick scientist Doc Brown.',imdbLink:'https://www.imdb.com/title/tt0088763/?ref_=nv_sr_srsg_0_tt_8_nm_0_in_0_q_back%20to%20the%20futur',imgUrl:'https://upload.wikimedia.org/wikipedia/en/thumb/d/d2/Back_to_the_Future.jpg/250px-Back_to_the_Future.jpg'},
//   {name:'Pulp Fiction',releaseDate:1994,genre:'Crime,Drama,Gangester',plot:'The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.',imdbLink:'https://www.imdb.com/title/tt0110912/?ref_=nv_sr_srsg_0_tt_5_nm_3_in_0_q_pulp',imgUrl:'https://upload.wikimedia.org/wikipedia/en/3/3b/Pulp_Fiction_%281994%29_poster.jpg'}
// ]

export function App(){

  // const [tekst,setTekst] = useState('1234')

  // function handleChangedInput(event){
  //   // console.log(event)
  //   setTekst(event.target.value)
  // }

  // useEffect(()=>{
  //   console.log("Vrednost na Input field: ",tekst)
  // },[tekst]) // [] -> dependecy array ako e prazen ova ke bide componentDidMount,za componentDidUpdate dodavame elementi(promenlivi) od state za koisto ke se prati nivnata vrednost

  return(
    <div id='app'>
      <Login/>
      {/* <Domashna movies = {filmovi}/> */}
      {/* <input 
      type='text'
      placeholder='Enter text here'
      value={tekst}
      onChange={handleChangedInput}
      /> */}
    </div>
  )
}