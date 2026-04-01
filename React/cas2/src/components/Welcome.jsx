import React from 'react';

export const Welcome = (props) =>{
    return(
        <div>
            <h2>Some {props.name}</h2>
            <p>Age: {props.age}</p>
        </div>
        
    )
}