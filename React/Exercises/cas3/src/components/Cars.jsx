export const Cars = ({vozila}) => {
    return (
      <div id="car">
        <table border="1">
          <thead>
            <tr>
              <th>Brand</th>
              <th>Model</th>
              <th>Year</th>
              <th>Naselba</th>
              <th>Ulica</th>
              <th>Oznaka</th>
            </tr>
          </thead>

          <tbody>
            {vozila.map ((v, index) => {
                return (
                  <tr key={index}>
                    <td>{v.brand}</td>
                    <td>{v.model}</td>
                    <td>{v.year}</td>
                    <td>{v.plates.grad.naselba}</td>
                    <td>{v.plates.grad.ulica}</td>
                    <td>{v.plates.oznaka}</td>
                  </tr>
                );
            }) }
          </tbody>
        </table>
      </div>
    );
}