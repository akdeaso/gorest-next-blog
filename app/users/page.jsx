"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import Pagination from "@/components/Pagination";

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [status, setStatus] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [searchText, setSearchText] = useState("");
  const totalPages = 6;
  const token =
    "13d087c6b0be88324d1114db36e6d95ea5bdf4acd55e3c133a6f14044526d369";

  useEffect(() => {
    fetchUsers();
  }, [currentPage]);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(
        `https://gorest.co.in/public/v2/users?page=${currentPage}&per_page=9`
      );
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const createOrUpdateUser = async () => {
    try {
      if (selectedUser) {
        // Update user
        await axios.put(
          `https://gorest.co.in/public/v2/users/${selectedUser.id}`,
          {
            name,
            email,
            gender,
            status,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setSuccessMessage("User updated successfully.");
      } else {
        // Create user
        await axios.post(
          "https://gorest.co.in/public/v2/users",
          {
            name,
            email,
            gender,
            status,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setSuccessMessage("User created successfully.");
      }
      closeModal();
      fetchUsers();
    } catch (error) {
      console.error("Error creating/updating user:", error);
      setErrorMessage("Failed to create/update user.");
    }
  };

  const deleteUser = async (userId) => {
    try {
      await axios.delete(`https://gorest.co.in/public/v2/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setSuccessMessage("User deleted successfully.");
      fetchUsers();
    } catch (error) {
      console.error("Error deleting user:", error);
      setErrorMessage("Failed to delete user.");
    }
  };

  const openModal = (user) => {
    setSelectedUser(user);
    setName(user ? user.name : "");
    setEmail(user ? user.email : "");
    setGender(user ? user.gender : "");
    setStatus(user ? user.status : "");
    setShowModal(true);
  };

  const closeModal = () => {
    setSelectedUser(null);
    setName("");
    setEmail("");
    setGender("");
    setStatus("");
    setErrorMessage("");
    setSuccessMessage("");
    setShowModal(false);
  };

  const paginate = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const filteredUsers = users.filter((user) => {
    return (
      user.name.toLowerCase().includes(searchText.toLowerCase()) ||
      user.email.toLowerCase().includes(searchText.toLowerCase())
    );
  });

  return (
    <div className="p-4 xl:px-32 bg-slate-900 text-slate-300 min-h-screen">
      <h1 className="text-3xl font-bold mb-4">Users</h1>
      <div className="flex justify-end mb-4">
        <button
          onClick={() => openModal(null)}
          className="bg-slate-700 text-slate-300 hover:bg-slate-300 hover:text-slate-950 font-semibold px-4 py-2 rounded-full"
        >
          Create User
        </button>
      </div>
      <input
        type="text"
        placeholder="Search Users"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        className="bg-slate-700 text-slate-300 mb-4 px-4 py-2 rounded-full w-full"
      />
      {filteredUsers.length === 0 ? (
        <p className="text-slate-400 mb-4">User not found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-3 gap-4">
          {filteredUsers.map((user) => (
            <div key={user.id} className="bg-slate-800 rounded-lg p-4 shadow">
              <h2 className="text-xl font-semibold mb-2 text-slate-300">
                {user.name}
              </h2>
              <p className="text-slate-400">{user.email}</p>
              <p className="text-slate-400">Status: {user.status}</p>
              <div className="flex justify-end mt-4 gap-2">
                <button
                  onClick={() => openModal(user)}
                  className="bg-slate-700 text-slate-300 hover-bg-slate-300 hover-text-slate-950 font-semibold px-4 py-2 mt-4 rounded-full"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteUser(user.id)}
                  className="bg-red-500 hover-bg-red-600 text-slate-300 font-semibold px-4 py-2 mt-4 rounded-full"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        paginate={paginate}
        nextPage={nextPage}
        prevPage={prevPage}
      />
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div
            className="absolute inset-0 bg-slate-900 opacity-80"
            onClick={closeModal}
          ></div>
          <div className="bg-slate-800 rounded-lg p-4 shadow-lg w-full max-w-2xl overflow-y-auto z-10 mx-5">
            <h2 className="text-2xl font-semibold mb-4">
              {selectedUser ? "Edit User" : "Create User"}
            </h2>
            {errorMessage && (
              <p className="text-red-500 mb-2">{errorMessage}</p>
            )}
            {successMessage && (
              <p className="text-green-500 mb-2">{successMessage}</p>
            )}
            <div className="mb-4">
              <label className="block text-slate-400 text-sm font-bold mb-2">
                Name
              </label>
              <input
                type="text"
                className="border p-2 rounded w-full bg-slate-300 text-slate-800"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-slate-400 text-sm font-bold mb-2">
                Email
              </label>
              <input
                type="email"
                className="border p-2 rounded w-full bg-slate-300 text-slate-800"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-slate-400 text-sm font-bold mb-2">
                Gender
              </label>
              <select
                className="border p-2 rounded w-full bg-slate-300 text-slate-800"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-slate-400 text-sm font-bold mb-2">
                Status
              </label>
              <select
                className="border p-2 rounded w-full bg-slate-300 text-slate-800"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="">Select Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
            <div className="flex justify-end gap-2">
              <button
                onClick={createOrUpdateUser}
                className="bg-slate-700 text-slate-300 hover-bg-slate-300 hover-text-slate-950 font-semibold px-4 py-2 mt-4 rounded-full"
              >
                {selectedUser ? "Update" : "Create"}
              </button>
              <button
                onClick={closeModal}
                className="bg-red-500 hover-bg-red-600 text-slate-300 font-semibold px-4 py-2 mt-4 rounded-full"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UsersPage;
