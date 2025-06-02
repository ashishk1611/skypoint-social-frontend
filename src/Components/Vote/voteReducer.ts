import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_BASE_URL } from "../../store";

export const votePost = createAsyncThunk(
  "posts/votePost",
  async ({
    postId,
    userId,
    value,
  }: {
    postId: string;
    userId: string;
    value: number;
  }) => {
    const response = await axios.post(`${API_BASE_URL}/Vote`, {
      postId,
      userId,
      value,
    });
    return response.data;
  }
);
