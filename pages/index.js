// frontend/pages/index.js

// _app.js
import "tailwindcss/tailwind.css";

import axios from "axios";
import { useEffect, useState } from "react";
import Form from "../components/Form.js";
import Table from "../components/Table.js";

export default function Home() {
  const [users, setUsers] = useState([]);
  const [userIds, setUserIds] = useState([]);
  const [visible, setVisible] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  
  console.log(userIds);
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:5555/users");
      console.log("Fetching data", response);
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const addUser = async (userData) => {
    try {
      await axios.post("http://localhost:5555/users", userData);
      fetchUsers();
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  const editUser = (user) => {
    setEditingUser(user);
    setVisible(true);
  };

  const updateUser = async (updatedUserData) => {
    try {
      await axios.put(
        `http://localhost:5555/users/${editingUser._id}`,
        updatedUserData
      );
      fetchUsers();
      setVisible(false); // Close the form after updating the user
      setEditingUser(null); // Reset editingUser state
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const deleteUser = async (userId) => {
    try {
      await axios.delete(`http://localhost:5555/users/${userId}`);
      fetchUsers();
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const sendMail = async () => {
    try {
      
      const res = await axios.post("http://localhost:5555/users/send-email", {
        userIds,
      });
      console.log(res);
      alert("Email sent successfully");
    } catch (error) {
      console.log(error);
    } 
  };

  return (
    <div className="container mx-auto">
      <main className="p-4">
        <Form
          onSubmit={editingUser?._id ? updateUser : addUser}
          initialData={editingUser}
          setVisible={setVisible}
          visible={visible}
          fetchUsers={fetchUsers}
        />
        <div className="w-full flex flex-row items-center justify-between">
          <h1 className="text-3xl font-bold mt-8 mb-4">Users</h1>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => setVisible(true)}
          >
            Add New User
          </button>
        </div>

        <Table
          users={users}
          setUserIds={setUserIds}
          userIds={userIds}
          onEdit={editUser}
          onDelete={deleteUser}
        />
        <button
          className="mt-8 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={sendMail}
        >
          Send Mail
        </button>
      </main>
    </div>
  );
}
