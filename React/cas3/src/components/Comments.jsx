export const Comments = ({listOfComments}) =>{
    return (
      <div id="comments">
        {Object.values(listOfComments).map((comment) => (
          <div key={comment.id}>
            {comment.author === "Marko" ?
            <p>Author: {comment.author}</p> :
            <p>Author: "Unknown"</p>
            }
          </div>
        ))}
      </div>
    );
}