import { configureStore } from "@reduxjs/toolkit";
import axios from "axios";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import followReducer from "../Components/Follow/followReducer";
import authReducer from "../Components/Login/authReducer";
import postReducer from "../Components/Posts/postReducer";
export const API_BASE_URL = "https://skypoint-social-backend-ax12.onrender.com";

export const store = configureStore({
  reducer: {
    posts: postReducer,
    follow: followReducer,
    auth: authReducer,
  },
});

axios.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
