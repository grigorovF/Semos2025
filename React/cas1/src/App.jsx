import React from "react";
import {Hello} from './components/Hello';
import {Goodbye} from './components/Goodbye'

export function App(){
    const broj = 1;
    let fraza = 'string vrednost';
    var karakter = 'c';


    return (
        <>
            <h1>"Hello from my app"</h1>
            <Hello/>
            <p>This is a paragraph</p>
            <p>{5+3}</p>
            <h3>brojot e:{broj}</h3>
            <h4>Fraza na denot: '{fraza}'</h4>
            <h1> {karakter} </h1>
            <Goodbye/>

        </>
    )
};

//export default App;  може и така и така