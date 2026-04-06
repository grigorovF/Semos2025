import React from "react";

export function Address(props){

  return(
    <div>
      {props.users.map((user, index) => {
        if(user.adresa === "Skopje"){
          return (
            <p key={index}>
              {user.ime} {user.prezime} - {user.adresa}
            </p>
          )
        }
        return null;
      })}
    </div>
  )
}