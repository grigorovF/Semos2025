import React from 'react'

export const Comments = ({hasComments, longComments}) =>{
    return(
        <div id='comments'>
            {hasComments ===true ? <h2>comments</h2>:
            <p>No Comments</p>}

            {longComments &&
            <h3>We have comm here</h3>
            }
        </div>
    )
}