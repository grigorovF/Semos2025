import React, { useState } from "react";
import "./Singup.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";

export function Singup() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    age: "",
    city: "",
  });

  const [showTable, setShowTable] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [comment, setComment] = useState("");
  const [isTextarea, setIsTextarea] = useState(false);

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  function toggleTable() {
    setShowTable(!showTable);
  }

  return (
    <div className="container">
      <h2>Sign Up</h2>

      <input name="name" placeholder="Name" onChange={handleChange} />
      <input name="email" placeholder="Email" onChange={handleChange} />

      <div className="password-box">
        <input
          type={showPassword ? "text" : "password"}
          name="password"
          placeholder="Password"
          onChange={handleChange}
        />

        <span
          onMouseDown={() => setShowPassword(true)}
          onMouseUp={() => setShowPassword(false)}
          onMouseLeave={() => setShowPassword(false)}
          className="eye"
        >
          <FontAwesomeIcon icon={faEye} />
        </span>
      </div>

      <input name="age" placeholder="Age" onChange={handleChange} />
      <input name="city" placeholder="City" onChange={handleChange} />

      <div>
        <div className="comment-row">
          {isTextarea ? (
            <textarea
              className="comment-input"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows="4"
            />
          ) : (
            <input
              className="comment-input"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Comment..."
            />
          )}

          <button onClick={() => setIsTextarea(!isTextarea)}>
            {isTextarea ? "↩" : "✏"}
          </button>
        </div>
      </div>

      <button onClick={toggleTable}>Show / Hide Data</button>

      {showTable && (
        <table>
          <tbody>
            <tr>
              <td>Name</td>
              <td>{form.name}</td>
            </tr>
            <tr>
              <td>Email</td>
              <td>{form.email}</td>
            </tr>
            <tr>
              <td>Password</td>
              <td>{form.password}</td>
            </tr>
            <tr>
              <td>Age</td>
              <td>{form.age}</td>
            </tr>
            <tr>
              <td>City</td>
              <td>{form.city}</td>
            </tr>
            <tr>
              <td>Comment</td>
              <td>{comment}</td>
            </tr>
          </tbody>
        </table>
      )}
    </div>
  );
}
