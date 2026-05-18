import {Welcome} from './components/Welcome';
import {StudentFunction} from './components/StudentFunction';
import {StudentClass} from './components/StudentClass';
import {Fruits} from './components/Fruits';

export const App = () =>{
  var name = "Stefan";
  var lastName = "Stefanovski";
  var age = 25;

  var student = {
    ime: 'Bojan',
    prezime: 'Bojanovski',
    grad: 'Skopje',
    univerzitet: 'UKIM'
  }


  var listOfFruits = [
    'banana', 'borovnki', 'kivi', 'ananas', 'grozje', 'orev'
  ]

  return(
    <div id ='app'>
      <h2>App</h2>
      <Welcome name={name} lastName={lastName} age={age}/>
      <br/>

      <StudentFunction student={student}/>

      <br/>

      <StudentClass student = {student}/>

      <br/>

      <Fruits listOfFruits ={listOfFruits}/>
    </div>
  )
}
