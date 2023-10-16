import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_GOREST_BASE_URL;
const API_KEY = process.env.NEXT_PUBLIC_GOREST_API_KEY;

export const fetchPosts = async (currentPage) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/posts?page=${currentPage}&per_page=36`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw error;
  }
};

export const fetchComments = async (postId) => {
  try {
    const response = await axios.get(`${BASE_URL}/comments?post_id=${postId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching comments:", error);
    throw error;
  }
};

export const fetchUsers = async (currentPage) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/users?page=${currentPage}&per_page=9`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

export const createUser = async (userData) => {
  try {
    const response = await axios.post(`${BASE_URL}/users`, userData, {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
};

export const updateUser = async (userId, userData) => {
  try {
    const response = await axios.put(`${BASE_URL}/users/${userId}`, userData, {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
};

export const deleteUser = async (userId) => {
  try {
    const response = await axios.delete(`${BASE_URL}/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error;
  }
};
