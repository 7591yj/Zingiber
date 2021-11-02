import { deleteDoc, doc, getFirestore, updateDoc } from "@firebase/firestore";
import React, { useState } from "react";

const Todo = ({ todoObject, isOwner }) => {
  const db = getFirestore();

  const [editing, setEditing] = useState(false);
  const [newTodo, setNewTodo] = useState(todoObject.text);

  const onClickDelete = async () => {
    const ok = window.confirm("Are you sure you want to delete this To-do?");
    if (ok) {
      await deleteDoc(doc(db, "todos", todoObject.id));
    }
  };

  const toggleEditing = async () => setEditing((prev) => !prev);

  const onSubmit = async (event) => {
    event.preventDefault();
    await updateDoc(doc(db, `todos/${todoObject.id}`), {
      text: newTodo,
    });
    setEditing(false);
  };

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewTodo(value);
  };

  return (
    <div>
      {editing ? (
        <>
          {isOwner && (
            <>
              <form onSubmit={onSubmit}>
                <input
                  type="text"
                  placeholder="Edit your To-do"
                  value={newTodo}
                  onChange={onChange}
                  required
                />
                <input type="submit" value="Update To-do" />
              </form>
              <button onClick={toggleEditing}>Cancel</button>
            </>
          )}
        </>
      ) : (
        <>
          <span>Written by: {todoObject.creatorDisplayName}</span>
          <h4>{todoObject.text}</h4>
          {isOwner && (
            <>
              <button onClick={onClickDelete}>Delete</button>
              <button onClick={toggleEditing}>Edit</button>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Todo;
