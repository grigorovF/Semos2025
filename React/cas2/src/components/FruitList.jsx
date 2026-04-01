import React from 'react'

export const FruitList = ({listaNaOvosje}) =>{
    return( <div id='fruit-List'>
        <h2>Fruit List</h2>
        {/* {listaNaOvosje.map((ovosje, i) =>{
            return(
                <p>{ovosje}</p>
            )
        })} */}
        <ul>
            {listaNaOvosje.map((ovosje, i) => (
                <li key={i}>{ovosje}</li>
            ))
        }
            
        </ul>
    </div>
)}