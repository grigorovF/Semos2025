import React from 'react';
import {Goodbye} from './Goodbye-FukcionalnaKomponenta';

export class Hello extends React.Component{
    render(){
        return(
        <div>
            <h3 style={{color:'red'}}>Hello from class component</h3>
            <Goodbye/>
            <h4>Uste malku tekst</h4>
        </div>
        )

    };

    
}