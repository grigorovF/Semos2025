import {useState} from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import "./Singupcss.css";

export const SingUp = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [age, setAge] = useState(0);
    const [showTable, setShowTable] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    function setTable(){
        setShowTable (!showTable)
    }

    function togglePassword() {
      setShowPassword(!showPassword);
    }
    
    return (
      <div id="singUpForm">
        <h2>Sing Up</h2>
        <input
          type="text"
          placeholder="Enter First Name"
          value={firstName}
          onChange={(e) => {
            setFirstName(e.target.value);
          }}
        />
        <input
          type="text"
          placeholder="Enter Last Name"
          value={lastName}
          onChange={(e) => {
            setLastName(e.target.value);
          }}
        />
        <input
          type="email"
          placeholder="Enter emai"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <div id="password-div">
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <span onClick={togglePassword}>
            <FontAwesomeIcon icon={faEye} />
          </span>
        </div>
        <input
          type="number"
          placeholder="Enter your age"
          value={age}
          onChange={(e) => {
            setAge(e.target.value);
          }}
        />
        <button onClick={setTable}>{
                showTable ?
                "Hide Table" : "Show Table"
            }
        </button>
        {showTable && (
          <table>
            <thead>
              <tr>
                <td>First Name</td>
                <td>Last Name</td>
                <td>Email</td>
                <td>Password</td>
                <td>Age</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{firstName}</td>
                <td>{lastName}</td>
                <td>{email}</td>
                <td>{password}</td>
                <td>{age}</td>
              </tr>
            </tbody>
          </table>
        )}
      </div>
    );
}