import { Avatar, Button, Card, CardContent, TextField } from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../store";
import { createPost } from "./postReducer";

export default function NewPostForm() {
  const dispatch = useAppDispatch();
  const user = useSelector((state: RootState) => state.auth.user);
  const userId = user?.id ?? "";
  const [content, setContent] = useState("");

  const handleSubmit = () => {
    if (!content.trim()) return;
    dispatch(createPost({ userId, content }));
    setContent("");
  };

  return (
    <Card className="rounded-2xl shadow-md mb-6 max-w-2xl mx-auto bg-white">
      <CardContent>
        <div className="flex space-x-3 items-start">
          <Avatar className="mt-1">{user?.displayName?.[0] ?? "U"}</Avatar>
          <div className="flex-1">
            <TextField
              placeholder="What's on your mind?"
              multiline
              rows={3}
              fullWidth
              value={content}
              onChange={(e) => setContent(e.target.value)}
              variant="outlined"
              InputProps={{
                style: {
                  borderRadius: 12,
                  backgroundColor: "#f9f9f9",
                },
              }}
            />
            <div className="flex justify-end mt-2">
              <Button
                variant="contained"
                onClick={handleSubmit}
                disabled={!content.trim()}
                className="rounded-full px-5"
              >
                Post
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
