"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import Pagination from "@/components/Pagination";

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(6);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          "https://gorest.co.in/public/v2/users"
        );
        setUsers(response.data);
        setTotalPages(Math.ceil(response.data.length / usersPerPage));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchUsers();
  }, []);

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

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

  return (
    <div className="p-4 bg-slate-900 text-slate-300 min-h-screen">
      <h1 className="text-3xl font-bold mb-4">Users</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-3 gap-4">
        {currentUsers.map((user) => (
          <div key={user.id} className="bg-slate-800 rounded-lg p-4 shadow">
            <h2 className="text-xl font-semibold mb-2 text-slate-300">
              {user.name}
            </h2>
            <p className="text-slate-400">{user.email}</p>
            <p className="text-slate-400">Status: {user.status}</p>
          </div>
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        paginate={paginate}
        nextPage={nextPage}
        prevPage={prevPage}
      />
    </div>
  );
};

export default UsersPage;
