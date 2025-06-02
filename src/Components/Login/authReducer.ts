import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { API_BASE_URL } from "../../store";

interface User {
  id: string;
  displayName: string;
  email: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}

const storedUser = localStorage.getItem("user");
const storedToken = localStorage.getItem("token");

const initialState: AuthState = {
  user: storedUser ? JSON.parse(storedUser) : null,
  token: storedToken || null,
  loading: false,
  error: null,
};

export const loginWithGoogle = createAsyncThunk(
  "auth/loginWithGoogle",
  async (idToken: string, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${API_BASE_URL}/Auth/GoogleLogin`, {
        IdToken: idToken,
      });
      const { token, user } = res.data;

      // Save token in localStorage or cookie
      localStorage.setItem("token", token);
      const loginTime = new Date().toISOString();
      localStorage.setItem("loginTime", loginTime);
      return user; // should be { id, displayName, email }
    } catch (err: any) {
      return rejectWithValue(err.response?.data || "Google login failed");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.error = null;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginWithGoogle.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        loginWithGoogle.fulfilled,
        (state, action: PayloadAction<User>) => {
          state.loading = false;
          state.user = {
            id: action.payload.id,
            displayName: action.payload.displayName,
            email: action.payload.email,
          };
          localStorage.setItem("user", JSON.stringify(action.payload));
        }
      )
      .addCase(loginWithGoogle.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});
export const { logout } = authSlice.actions;
export default authSlice.reducer;
