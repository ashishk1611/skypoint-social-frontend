import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_BASE_URL } from "../../store";
import { addComment } from "../Comment/commentReducer";
import { votePost } from "../Vote/voteReducer";

// Async thunk to fetch posts from backend API
export const fetchPosts = createAsyncThunk(
  "posts/fetchPosts",
  async (userId: string) => {
    const response = await axios.get(`${API_BASE_URL}/Post?userId=${userId}`);
    return response.data;
  }
);

export const createPost = createAsyncThunk(
  "posts/createPost",
  async (newPost: { userId: string; content: string }) => {
    const response = await axios.post(`${API_BASE_URL}/Post`, newPost);
    return response.data;
  }
);

export interface Post {
  // Define according to your API response, e.g.
  id: string;
  content: string;
  authorId: string;
  author: string;
  createdAt: string;
  commentsCount: number;
  votesCount: number;
  votes: number;
  comments: Comment[];
}

export interface Comment {
  id: string;
  content: string;
  author: string;
  createdAt: string;
}

interface PostsState {
  posts: Post[];
  loading: boolean;
  error: string | null;
}

const initialState: PostsState = {
  posts: [],
  loading: false,
  error: null,
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Something went wrong";
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.posts.unshift(action.payload as Post); // Add the new post to the top
      })
      .addCase(addComment.fulfilled, (state, action) => {
        const { postId, ...newComment } = action.payload;
        const post = state.posts.find((p) => p.id === postId);
        if (post) {
          post.comments.push(newComment);
          post.commentsCount += 1;
        }
      })
      .addCase(votePost.fulfilled, (state, action) => {
        const { postId, value } = action.payload;
        const post = state.posts.find((p) => p.id === postId);
        if (post) {
          post.votes += value;
          post.votesCount += 1;
        }
      });
  },
});

export default postsSlice.reducer;
