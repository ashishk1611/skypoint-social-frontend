import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_BASE_URL } from "../../store";

export const addComment = createAsyncThunk(
  "posts/addComment",
  async (newComment: { postId: string; authorId: string; content: string }) => {
    const response = await axios.post(`${API_BASE_URL}/Comment`, newComment);
    return { ...response.data };
  }
);
