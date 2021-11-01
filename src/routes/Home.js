import React, { useEffect, useState } from "react";
import {
  collection,
  getFirestore,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";

const Home = ({ userObj }) => {
  const [todo, setTodo] = useState([]);

  useEffect(() => {});

  return (
    <>
      <h1>Welcome to Home</h1>
      <h2>TESTING</h2>
    </>
  );
};

export default Home;
