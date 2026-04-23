import React from "react";

export const Users = ({ usersList }) => {
  return (
    <div id="users">
      <table border={1}>
        <thead>Name</thead>
        <thead>userame</thead>

        <tbody>
          {usersList.map((user) => {
            return (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.username}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
