import React from "react";

export function Age(props){

  return(
    <div>
      {props.users.map((user, index) => {
        if(user.godini >= 18){
          return (
            <p key={index}>
              {user.ime} {user.prezime} - {user.godini} years
            </p>
          )
        }
        else{
          return (
            <p>Less than 18</p>
          )
        }
      })}
    </div>
  )
}