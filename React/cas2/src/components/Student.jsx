import React from 'react';

export class Student extends React.Component{

    render(){
        console.log(this.props)
        return(
            <div id='class-component'>
              <h2>Student </h2>
              <h3>Name:{this.props.student.name}</h3>
              <h6>Address:{this.props.student.address} </h6>
              <p>College: {this.props.student.college} </p>
              <p>Index: {this.props.student.index} </p>
            </div>
        )
    }
}