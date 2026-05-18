import React from 'react'
export class StudentClass extends React.Component{
    render(){
        console.log(this.props);
        return (
          <div>
            <h2>Student Class</h2>
            <h3> Name: {this.props.student.ime} </h3>
            <h2> Last Name: {this.props.student.prezime} </h2>
            <h1> University: {this.props.student.univerzitet}</h1>
          </div>
        );
    }
}