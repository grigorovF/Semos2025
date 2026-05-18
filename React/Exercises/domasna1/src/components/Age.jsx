import {studenti} from './students'

export const Age = () =>{
    const polnoletni = Object.values(studenti).filter(
        (student) => student.godini >= 18
    );
    return polnoletni.map((student, i) => (
      <div key={i}>
        <p>Ime: {student.ime}</p>
        <p>Prezime: {student.prezime}</p>
        <p>Grad: {student.grad}</p>
        <p>Godini: {student.godini}</p>
        <br/>
      </div>
    ));
}