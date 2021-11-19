import React, { useEffect, useState } from "react";
import {
  collection,
  getFirestore,
  onSnapshot,
  query,
} from "firebase/firestore";
import Todo from "components/Todo";
import TodoFac from "components/TodoFac";

const Home = ({ userObj }) => {
  const db = getFirestore();
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const collectionQuery = query(collection(db, "todos"));

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
  }, [db]);

  return (
    <div>
      <TodoFac userObj={userObj} />
      <div>
        {todos.map((todo) => (
          <Todo
            key={todo.id}
            todoObject={todo}
            isOwner={todo.creatorId === userObj.uid}
            isFinished={todo.finished}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
