"use client";

import Pagination from "@/components/Pagination";
import { useState, useEffect } from "react";
import { fetchPosts, fetchComments } from "@/utils/api";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(6);
  const [showModal, setShowModal] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [comments, setComments] = useState([]);
  const totalPages = 6;

  useEffect(() => {
    getPostsData();
  }, [currentPage]);

  const getPostsData = async () => {
    try {
      const response = await fetchPosts(currentPage);
      setPosts(response);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const getCommentsData = async (postId) => {
    try {
      const response = await fetchComments(postId);
      setComments(response);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

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

  const openModal = (post) => {
    setSelectedPost(post);
    setShowModal(true);
    getCommentsData(post.id);
  };

  const closeModal = () => {
    setSelectedPost(null);
    setShowModal(false);
  };

  return (
    <div className="p-4 xl:px-32 bg-slate-900 text-slate-300 min-h-screen">
      <h1 className="text-3xl font-bold mb-4">Posts</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {currentPosts.map((post) => (
          <div
            key={post.id}
            className="bg-slate-800 rounded-lg p-4 shadow cursor-pointer"
            onClick={() => openModal(post)}
          >
            <h2 className="text-xl font-semibold mb-2 text-slate-300">
              {post.title}
            </h2>
            <p className="text-slate-400">{post.body}</p>
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
      {showModal && selectedPost && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div
            className="absolute inset-0 bg-slate-900 opacity-80"
            onClick={closeModal}
          ></div>
          <div className="bg-slate-800 rounded-lg p-4 shadow-lg w-full max-w-2xl overflow-y-auto z-10 mx-5">
            <h2 className="text-xl font-semibold mb-2 text-slate-300">
              {selectedPost.title}
            </h2>
            <p className="text-slate-400">{selectedPost.body}</p>
            <h3 className="text-lg font-semibold mt-4 mb-2 text-slate-300">
              Comments
            </h3>
            {comments.map((comment) => (
              <div
                key={comment.id}
                className="bg-slate-700 rounded-lg p-2 mt-2"
              >
                <p className="text-slate-300">{comment.name}</p>
                <p className="text-slate-400">{comment.body}</p>
              </div>
            ))}
            <button
              onClick={closeModal}
              className="bg-slate-700 text-slate-300 hover:bg-slate-300 hover:text-slate-950 font-semibold px-4 py-2 mt-4 rounded-full"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
