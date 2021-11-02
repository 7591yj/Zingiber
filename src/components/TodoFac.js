import { addDoc, collection, getFirestore } from "@firebase/firestore";
import React, { useState } from "react";

const TodoFac = ({ userObj }) => {
  const db = getFirestore();

  const [todo, setTodo] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();

    const todoObj = {
      text: todo,
      createAt: Date.now(),
      creatorId: userObj.uid,
      creatorDisplayName: userObj.displayName,
      finished: 0,
    };

    try {
      const docRef = await addDoc(collection(db, "todo"), todoObj);
      console.log("Written", docRef.id);
    } catch (error) {
      console.log(error);
    }

    setTodo("");
  };

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setTodo(value);
  };

  return (
    <form onSubmit={onSubmit}>
      <input
        type="text"
        value={todo}
        onChange={onChange}
        placeholder="Write a To-do"
        maxLength={120}
      />
      <input type="submit" value="To-do" />
    </form>
  );
};

export default TodoFac;
