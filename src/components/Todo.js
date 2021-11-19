import { deleteDoc, doc, getFirestore, updateDoc } from "@firebase/firestore";
import React, { useState } from "react";
import "css/Todo.css";

const Todo = ({ todoObject, isOwner, isFinished }) => {
  const db = getFirestore();

  const [finished, setFinished] = useState(isFinished);
  const [editing, setEditing] = useState(false);
  const [newTodo, setNewTodo] = useState(todoObject.text);

  const onClickDelete = async () => {
    const ok = window.confirm("Are you sure you want to delete this To-do?");
    if (ok) {
      await deleteDoc(doc(db, "todos", todoObject.id));
    }
  };

  const toggleEditing = async () => setEditing((prev) => !prev);

  const onClickFinished = async () => {
    setFinished((prev) => !prev);
    if (finished === false) {
      await updateDoc(doc(db, `todos/${todoObject.id}`), {
        finished: true,
      });
    } else if (finished === true) {
      await updateDoc(doc(db, `todos/${todoObject.id}`), {
        finished: false,
      });
    }
  };

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
          {finished ? (
            <div className="finished">
              <>
                <span>Written by: {todoObject.creatorDisplayName}</span>
                <h4>{todoObject.text}</h4>
                {isOwner && (
                  <>
                    <button onClick={onClickDelete}>Delete</button>
                    <button onClick={toggleEditing}>Edit</button>
                    <button onClick={onClickFinished}>Not finished</button>
                  </>
                )}
              </>
            </div>
          ) : (
            <div className="unfinished">
              <span>Written by: {todoObject.creatorDisplayName}</span>
              <h4>{todoObject.text}</h4>
              {isOwner && (
                <>
                  <button onClick={onClickDelete}>Delete</button>
                  <button onClick={toggleEditing}>Edit</button>
                  <button onClick={onClickFinished}>Finish</button>
                </>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Todo;
