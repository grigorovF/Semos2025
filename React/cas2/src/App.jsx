import React from 'react';
import {Welcome} from './components/Welcome';
import {Student} from './components/Student';
import {StudentFunction} from './components/StudentFunction';
import {Comments} from './components/Comments'
import {FruitList} from './components/FruitList'

export function App(){

var name = "Nikola";
var lastName = "Nikolovski";
var age = 30;  
var student = {
  name: "Ivan",
  address: "Skopje",
  college: "UKIM",
  index:141088
}

var hasComments = true;
var longComments = true;
var listaNaOvosje =['banana', "aple", "orange"];
return(
  <div>
      <FruitList listaNaOvosje={listaNaOvosje}/>
      <Welcome name="Filip" lastName = "Dzukovski" age={29}/>
      <h2>App</h2>
      <Welcome name={name} lastName={lastName} age={age}/>
      <Student student={student}/>
      <StudentFunction student={student}/>
      <Comments hasComments={hasComments} longComments ={longComments}/>
    </div>
  )

}


// Domashna1: Ke kreirate 4 useri so atributi {ime,prezime,adresa,godini} vo App.jsx fajlot definirani kako varijabli

// koristejki props vo 2 posebni fajla ke gi prfrlite userite vo edniot fajl (Age.jsx) ke gi prikazete userite koi se postari od 18 god za ostanatite ke prikazete paragraf "Less then 18", vo drugiot fajl  (Address.jsx) ke gi prikazete userite koi imaat adresa Skopje.

// **Atributite na userite gi zadavate vie
 