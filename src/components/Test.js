import React, { useEffect, useState } from "react";
import UserForm from "./UserForm";
import AgeGroupColumn from "./AgeGroupColumn";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const ageGroups = ["1-18", "19-25", "26-45", "45+"];

function Test() {
  const [add, setAdd] = useState(false);
  const [edit, setEdit] = useState(false);
  const [editId, setEditId] = useState();
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "John Doe",
      age: 18,
      email: "johndoe@gmail.com",
      phone: "1234567890",
      ageGroup: "1-18",
    },
    {
      id: 2,
      name: "Jane Doe",
      age: 30,
      email: "janedoe@gmail.com",
      phone: "1234567890",
      ageGroup: "26-45",
    },
  ]);

  const [formattedUsers, setFormattedUsers] = useState({});

  const handleOnDragEnd = (result) => {
    if (!result.destination) return;
    const { source, destination } = result;

    if (source.droppableId !== destination.droppableId) {
      // Moving between columns
      const sourceColumn = formattedUsers[source.droppableId];

      const destColumn = formattedUsers[destination.droppableId];

      const [removed] = sourceColumn.splice(source.index, 1);
      removed.ageGroup = destination.droppableId;

      destColumn.splice(destination.index, 0, removed);

      setFormattedUsers({
        ...formattedUsers,
        [source.droppableId]: sourceColumn,
        [destination.droppableId]: destColumn,
      });
    } else {
      // Moving within the same column
      const column = formattedUsers[source.droppableId];
      const [removed] = column.splice(source.index, 1);
      column.splice(destination.index, 0, removed);
      setFormattedUsers({
        ...formattedUsers,
        [source.droppableId]: column,
      });
    }
  };

  useEffect(() => {
    const usersGroupedByAgeGroup2 = ageGroups.reduce((acc, ageGroup) => {
      const usersInAgeGroup = users.filter((user) => {
        return user.ageGroup === ageGroup;
      });

      return {
        ...acc,
        [ageGroup]: usersInAgeGroup,
      };
    }, {});

    const usersGroupedByAgeGroup = ageGroups.reduce((acc, ageGroup) => {
      const usersInAgeGroup = users.filter(
        (user) => user.ageGroup === ageGroup
      );

      acc[ageGroup] = usersInAgeGroup.length > 0 ? usersInAgeGroup : [];

      return acc;
    }, {});

    setFormattedUsers(usersGroupedByAgeGroup);
  }, [users]);

  return (
    <div className="relative">
      <div className="addcontainer">
        <button className="addbutton" onClick={() => setAdd(true)}>
          Add
        </button>
      </div>
      {add && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <div className="inline-block overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="px-4 pt-5 pb-4 bg-white sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3
                      className="text-lg font-medium leading-6 text-gray-900"
                      id="modal-title"
                    >
                      User Form
                    </h3>
                    <div className="mt-2">
                      <UserForm
                        add={add}
                        setAdd={setAdd}
                        setUsers={setUsers}
                        users={users}
                        edit={edit}
                        editId={editId}
                        setEdit={setEdit}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="px-4 py-3 bg-gray-50 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="inline-flex justify-center w-full px-4 py-2 mt-3 text-base font-medium text-white bg-red-600 border border-transparent rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => setAdd(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {Object.keys(formattedUsers).length > 0 && (
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <div className="tableContainer">
            {ageGroups.map((ageGroup, index) => (
              <AgeGroupColumn
                key={ageGroup}
                ageGroup={ageGroup}
                users={users}
                setUsers={setUsers}
                formattedUsers={formattedUsers}
                setEdit={setEdit}
                setEditId={setEditId}
                ageGroups={ageGroups}
              />
            ))}
          </div>
        </DragDropContext>
      )}
    </div>
  );
}

export default Test;
