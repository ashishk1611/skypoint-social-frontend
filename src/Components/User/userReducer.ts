import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_BASE_URL } from "../../store";

export const fetchFollowing = createAsyncThunk(
  "user/fetchFollowing",
  async (userId: string) => {
    const res = await axios.get(`${API_BASE_URL}/User/${userId}/Following`);
    return res.data; // assuming this returns an array of user IDs
  }
);
