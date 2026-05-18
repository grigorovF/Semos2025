import {studenti} from './students'

export const Grad = () => {
    const students = Object.values(studenti).filter(
        (s) => s.grad === 'Skopje'
    )

    return students.map((s, i) => (
      <div key={i}>
        <h4>Ime: {s.ime}</h4>
        <h4>Prezime: {s.prezime}</h4>
        <h4>Grad: {s.grad}</h4>
      </div>
    ));
}