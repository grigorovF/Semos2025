export const Comments = ({komentari}) => {
    return (
      <table border="1">
        <thead>
          <tr>
            <td>Comments Table</td>
          </tr>
          <tr>
            <td>Author</td>
            <td>Content</td>
          </tr>
        </thead>
        <tbody>
          {komentari.map((k, index) => {
            return (
              k.author === "Marko" ? (
                <tr key={index}>
                  <td>{k.author} </td>
                  <td>{k.content} </td>
                </tr>
              ) :
              null
            );
          })}
        </tbody>
      </table>
    );

}