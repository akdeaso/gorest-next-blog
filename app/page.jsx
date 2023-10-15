"use client";

import axios from "axios";
import { useState, useEffect } from "react";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(6);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    axios
      .get("https://gorest.co.in/public/v2/posts")
      .then((response) => {
        setPosts(response.data);
        setTotalPages(Math.ceil(response.data.length / postsPerPage));
        console.log(response.data.length, "tes ini");
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

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
      <h1 className="text-3xl font-bold mb-4">Posts</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {currentPosts.map((post) => (
          <div key={post.id} className="bg-slate-800 rounded-lg p-4 shadow">
            <h2 className="text-xl font-semibold mb-2 text-slate-300">
              {post.title}
            </h2>
            <p className="text-slate-400">{post.body}</p>
          </div>
        ))}
      </div>
      <div className="mt-4">
        <ul className="flex justify-center items-center">
          <li>
            <button
              onClick={prevPage}
              className="bg-slate-800 text-slate-300 hover:bg-slate-300 hover:text-slate-950 font-semibold px-4 py-2 m-1 rounded-full"
            >
              Prev
            </button>
          </li>
          {Array.from({ length: totalPages }).map((_, index) => (
            <li key={index}>
              <button
                onClick={() => paginate(index + 1)}
                className={`${
                  currentPage === index + 1
                    ? "bg-slate-300 text-slate-950"
                    : "bg-slate-800 text-slate-300"
                } hover:bg-slate-300 hover:text-slate-950 font-semibold px-4 py-2 m-1 rounded-full`}
              >
                {index + 1}
              </button>
            </li>
          ))}
          <li>
            <button
              onClick={nextPage}
              className="bg-slate-800 text-slate-300 hover:bg-slate-300 hover:text-slate-950 font-semibold px-4 py-2 m-1 rounded-full"
            >
              Next
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Home;
