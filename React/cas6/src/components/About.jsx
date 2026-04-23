import React from 'react';
import {Outlet} from 'react-router-dom'
export const About = () =>{
    return (
        <>
        <h2>ABOUT</h2>
        <Outlet/>
        </>
    )
}