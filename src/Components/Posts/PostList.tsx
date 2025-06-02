// components/PostList.tsx
import { CircularProgress } from "@mui/material";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../store";
import { fetchFollowing } from "../User/userReducer";
import Post from "./Post";
import { fetchPosts } from "./postReducer";

export default function PostList() {
  const dispatch = useAppDispatch();
  const userId = useSelector((state: RootState) => state.auth.user?.id ?? "");
  const { posts, loading, error } = useSelector(
    (state: RootState) => state.posts
  );

  useEffect(() => {
    dispatch(fetchPosts(userId));
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchFollowing(userId));
  }, []);

  if (loading) return <CircularProgress className="m-4" />;
  if (error) return <div className="m-4 text-red-600">Error: {error}</div>;

  return (
    <div className="space-y-6 p-4 max-w-2xl mx-auto">
      {posts.map((post: any) => (
        <Post key={post.id} post={post} currentUserId={userId} />
      ))}
    </div>
  );
}
