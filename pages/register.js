import React, { useState, useContext } from "react";
import { Card } from "../components/card";
import { registerUser } from "../components/auth";
import AppContext from "../components/context";
import Router from "next/router";

const Register = () => {
  const { setCurrentUser } = useContext(AppContext);
  const [show, setShow]         = useState(true);
  const [status, setStatus]     = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');

	const handleEmail = (e) => {
		setEmail(e.target.value.toLowerCase());
  }

	const handlePassword = (e) => {
		setPassword(e.target.value);
	}

	const handleUsername = (e) => {
		setUsername(e.target.value.toUpperCase());
	}

  const validate = (field, label) => {
    if (!field) {
      setStatus('Error: Please enter your ' + label);
      return false;
    }
    return true;
  }

  const validatePasswordLength = () => {
    if (password.length < 8) {
      setStatus('Error: Your password needs to be at least 8 characters long.');
      return false;
    } 
    return true;
  }

  const handleCreate = (e) => {
    e.preventDefault();
    if (!validate(username,     'username'))     return;
    if (!validate(email,    'email'))    return;
    if (!validate(password, 'password')) return;
    if (!validatePasswordLength())       return;
    registerUser(username, email, password)
      .then((res) => {
        console.log(res.data.user);
      })
      .catch((error) => {
        console.log(`error in register: ${error}`)
      });
    setCurrentUser(username)
    setShow(false);
    setStatus('');
  }    

  const clearForm = () => {
    setUsername('');
    setEmail('');
    setPassword('');
    setShow(true);
  }
  return (
    <Card
      header="Sign Up"
      status={status}
      body= {show ? (
        <form>
          <label>Username</label>
          <input 
            type="input"
            className="form-control"
            placeholder="Enter username"
            onChange={handleUsername}
          />
          <br></br>
          <label>Email Address</label>
          <input
            type="input"
            className="form-control"
            placeholder="Enter email"
            onChange={handleEmail}
          />
          <br></br>
          <label>Password - min. 8 characters</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter password"
            onChange={handlePassword}
          />
          <br></br>
          <button
            id="account submit"
            disabled={username || email || password ? false : true}
            type="submit"
            className="btn btn-success"
            onClick={handleCreate}
          >Create Account</button>
        </form>
      ):(
        <>
          <h5>Success! You created an account!</h5>
            <button
              type="submit"
              className="btn btn-success"
              onClick={() => Router.push("/")}
            >Start shopping!</button>
            <br></br>
            <br></br>
            <button
              type="submit"
              className="btn btn-secondary"
              onClick={clearForm}
            >Add another account</button>
        </>
        )
      }
    />
  );
};

export default Register;
