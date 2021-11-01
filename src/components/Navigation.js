import React from "react";
import { Link } from "react-router-dom";

const Navigation = ({ userObj }) => {
  return (
    <header>
      <ul>
        <li className="home">
          <Link to="/">Home</Link>
        </li>
        <li className="category">
          <Link to="/category">Category</Link>
        </li>
        <li className="setting">
          <Link to="/setting">Setting</Link>
        </li>
      </ul>
      <h1>Zingiber</h1>
    </header>
  );
};

export default Navigation;
