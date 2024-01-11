import React, { useState, useEffect } from "react";

const UserForm = ({ add, setAdd, setUsers, users, edit, editId, setEdit }) => {
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    phone: "",
    age: "",
  });

  useEffect(() => {
    if (edit) {
      const user = users.find((user) => user.id === editId);
      if (user) {
        setUserDetails(user);
      }
    }
  }, [edit, editId, users]);

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setUserDetails((prev) => ({ ...prev, [name]: value }));
  };

  const getAgeGroup = (age) => {
    if (age >= 18 && age <= 25) {
      return "18-25";
    } else if (age >= 26 && age <= 35) {
      return "26-35";
    } else if (age >= 36 && age <= 45) {
      return "36-45";
    } else if (age >= 46) {
      return "45+";
    } else {
      return "Under 18";
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      userDetails.name &&
      userDetails.email &&
      userDetails.phone &&
      userDetails.age
    ) {
      const newUserDetails = {
        name: userDetails.name,
        email: userDetails.email,
        phone: userDetails.phone,
        age: userDetails.age,
        ageGroup: getAgeGroup(userDetails.age),
      };

      // If this is an edit operation, find the user to edit and replace their details
      if (edit) {
        const index = users.findIndex((user) => user.id === userDetails.id);
        const updatedUsers = [...users];
        updatedUsers[index] = newUserDetails;
        setUsers(updatedUsers);
      } else {
        // This is an add operation, so add the new user details to the list of users
        setUsers([...users, newUserDetails]);
      }

      // Reset the form
      setUserDetails({ name: "", email: "", phone: "", age: "" });
      setAdd(false);
      setEdit(false);
    } else {
      alert("Please fill in all fields");
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        value={userDetails.name}
        placeholder="Enter name"
        onChange={changeHandler}
      />
      <input
        type="email"
        name="email"
        value={userDetails.email}
        placeholder="Enter email"
        onChange={changeHandler}
      />
      <input
        type="tel"
        name="phone"
        value={userDetails.phone}
        placeholder="Enter phone"
        onChange={changeHandler}
      />
      <input
        type="number"
        name="age"
        value={userDetails.age}
        placeholder="Enter age"
        onChange={changeHandler}
      />
      <button className="button">{edit ? "Update" : "Add"}</button>
      <button
        onClick={() => {
          setAdd(false);
          setEdit(false);
        }}
      >
        Cancel
      </button>
    </form>
  );
};

export default UserForm;
