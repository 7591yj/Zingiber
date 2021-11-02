import React, { useEffect, useState } from "react";
import {
  collection,
  getFirestore,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";
import Todo from "components/Todo";
import TodoFac from "components/TodoFac";

const Home = ({ userObj }) => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const collectionQuery = query(
      collection(getFirestore(), "todo"),
      orderBy("createdAt", "desc")
    );
    const unsubsribe = onSnapshot(collectionQuery, (querySnapshot) => {
      const todoArray = querySnapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });
      setTodos(todoArray);
    });

    return () => {
      unsubsribe();
    };
  }, []);

  return (
    <>
      <TodoFac userObj={userObj} />
      <div>
        {todos.map((todo) => (
          <Todo
            key={todo.id}
            todoObject={todo}
            isOwner={todo.creatorId === userObj.id}
          />
        ))}
      </div>
    </>
  );
};

export default Home;
