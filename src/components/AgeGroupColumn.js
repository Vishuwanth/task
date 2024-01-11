import React from "react";
import UserCard from "./UserCard";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const AgeGroupColumn = ({
  ageGroup,
  users,
  setUsers,
  setEdit,
  setEditId,
  ageGroups,
  formattedUsers,
}) => {
  const deleteHandler = (userId) => {};

  return (
    <div className="col">
      <p style={{ borderBottom: "1px solid black", padding: "10px" }}>
        Age {ageGroup}
      </p>
      <Droppable droppableId={ageGroup}>
        {(provided, snapshot) => (
          <div
            className={` ${snapshot.isDraggingOver ? "" : ""}`}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {formattedUsers[ageGroup].map((user, index) => (
              <UserCard
                key={user.id}
                user={user}
                setEdit={setEdit}
                setEditId={setEditId}
                deleteHandler={deleteHandler}
                index={index}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default AgeGroupColumn;
