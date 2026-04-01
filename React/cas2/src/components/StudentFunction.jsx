import React from 'react';

export const StudentFunction = (props) => {
    console.log(props);
    return(
        <div id='function-student'>
            <h2>Student Function</h2>
            <h1>Name:{props.student.name} </h1>
            <h3>Address:{props.student.address} </h3>
            <p>College: {props.student.college} </p>
            <p>Index: {props.student.index} </p>
        </div>
    )

}