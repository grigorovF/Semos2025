import React from 'react';
import { Age } from './components/Age';
import { Address } from './components/Adress';

export function App(){

  const user1 = {
    ime: "Nikola",
    prezime: "Nikolovski",
    adresa: "Skopje",
    godini: 25
  }

  const user2 = {
    ime: "Pero",
    prezime: "Perovski",
    adresa: "Bitola",
    godini: 32
  }

  const user3 = {
    ime: "Marko",
    prezime: "Markovski",
    adresa: "Skopje",
    godini: 19
  }

  const user4 = {
    ime: "Jovana",
    prezime: "Jovanova",
    adresa: "Ohrid",
    godini: 16
  }

  const users = [user1, user2, user3, user4];

  return(
    <div>
      <h2>Users older than 18</h2>
      <Age users={users} />

      <h2>Users from Skopje</h2>
      <Address users={users} />
    </div>
  )
}