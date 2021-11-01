import React, { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassWord] = useState("");
  const [error, setError] = useState("");

  const onChange = (event) => {
    const {
      target: { name, value },
    } = event;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassWord(value);
    }
  };

  const onSubmit = (event) => {
    event.preventDefault();
    const fAuth = getAuth();
    signInWithEmailAndPassword(fAuth, email, password).catch((error) => {
      const errorMessage = error.message;
      setError(errorMessage);
    });
  };

  return (
    <>
      <h2>Welcome to Zingiber!</h2>
      <h4>Please sign in to continue.</h4>
      <form onSubmit={onSubmit}>
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={email}
          onChange={onChange}
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={password}
          onChange={onChange}
          required
        />
        <input type="submit" value="Sign in" />
        {error && <span>{error}</span>}
      </form>
    </>
  );
};

export default Auth;
