import React from 'react';
import {Link} from 'react-router-dom'
export const Navigation = () =>{
    return (
      <ul>
        <li>
          <Link to="/about"> About</Link>
          <ul>
            <li>
              <Link to="/about/us">us</Link>
            </li>
          </ul>
        </li>
        <li>
          <Link to="/contact">Contact</Link>
        </li>
        <li>
          <Link to="/home">Home</Link>
        </li>
        <li>
          <Link to="/users">Users</Link>
        </li>
      </ul>
    );

}