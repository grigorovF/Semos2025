export const Fruits = ({listOfFruits}) => {
    return (
      <div>
        <h2>All Fruits</h2>
        {
          <ul>
            {listOfFruits.map((ovosje, i) => (
              <li key={i}>{ovosje}</li>
            ))}
          </ul>
        }
      </div>
    );
}