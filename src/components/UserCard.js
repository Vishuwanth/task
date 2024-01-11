import React from "react";
import { Draggable } from "react-beautiful-dnd";

const UserCard = ({ user, setEdit, setEditId, deleteHandler, index }) => {
  const { id, name, age, email, phone } = user;

  const handleEdit = () => {
    setEditId(id);
    setEdit(true);
  };

  return (
    <Draggable key={user.id} draggableId={`user-${user.id}`} index={index}>
      {(provided, snapshot) => (
        <div
          className={`card ${snapshot.isDragging ? "dragging" : ""}`}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <div className="card">
            <div className="buttons">
              <button className="editButton" onClick={handleEdit}>
                Edit
              </button>
              <button onClick={() => deleteHandler(id)}>Delete</button>
            </div>
            <p>Name: {name}</p>
            <p>Age: {age}</p>
            <p>Email: {email}</p>
            <p>Phone: {phone}</p>
            <p>Age Group: {user.ageGroup}</p>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default UserCard;
