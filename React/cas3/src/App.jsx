//import {useState, useEffect} from 'react';
import {Domasno} from './components/Domasno';
import {Comments} from './components/Comments'

export function App() {
  let comments = [
    { id: 0, author: "Filip", content: "Comment 1" },
    { id: 1, author: "Simona", content: "Comment 2" },
    { id: 2, author: "Marko", content: "Email in Spam" },
  ];

  let users = {
    user1: {
      ime: "Ivan",
      prezime: "Jovanov", 
      adresa: "Skopje", 
      godini: 15
    },
    user2: { 
      ime: "Petar",
      prezime: "Perov", 
      adresa: "Debar", 
      godini: 22 
    },
    user3: {
      ime: "Dime", 
      prezime: "Dimovski", 
      adresa: "Skopje", 
      godini: 40 
    },
    user4: {
      ime: "Sime", 
      prezime: "Simovski", 
      adresa: "Gostivar", 
      godini: 12 
    }
  }

  return(
    <div id='app'>
      <Domasno useri = {users}/>
      <Comments listOfComments = {comments}/>
    </div>
  )
}