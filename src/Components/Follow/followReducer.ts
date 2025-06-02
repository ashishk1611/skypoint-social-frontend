import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_BASE_URL } from "../../store";
import { fetchFollowing } from "../User/userReducer";

export const followUser = createAsyncThunk(
  "follow/followUser",
  async ({
    followerId,
    followedId,
  }: {
    followerId: string;
    followedId: string;
  }) => {
    const response = await axios.post(`${API_BASE_URL}/User/Follow`, {
      followerId,
      followedId,
    });
    return { followedId };
  }
);

export const unfollowUser = createAsyncThunk(
  "follow/unfollowUser",
  async ({
    followerId,
    followedId,
  }: {
    followerId: string;
    followedId: string;
  }) => {
    await axios.post(`${API_BASE_URL}/User/Unfollow`, {
      followerId,
      followedId,
    });
    return { followedId };
  }
);

interface Follow {
  followedId: string;
  displayName: string | undefined;
  email: string | undefined;
}

const followSlice = createSlice({
  name: "follow",
  initialState: {
    following: [] as Follow[], // Array of followed userIds
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFollowing.fulfilled, (state, action) => {
        state.following = action.payload;
      })
      .addCase(followUser.fulfilled, (state, action) => {
        state.following.push({
          followedId: action.payload.followedId,
        } as Follow);
      })
      .addCase(unfollowUser.fulfilled, (state, action) => {
        state.following = state.following.filter(
          (user) => user.followedId !== action.payload.followedId
        );
      });
  },
});

export default followSlice.reducer;
