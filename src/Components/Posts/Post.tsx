import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import {
  Avatar,
  Button,
  Card,
  CardContent,
  Collapse,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import { formatDistanceToNow } from "date-fns";
import { useState } from "react";

import { useAppDispatch } from "../../store";
import { addComment } from "../Comment/commentReducer";
import FollowButton from "../Follow/FollowButton";
import { votePost } from "../Vote/voteReducer";
import CommentSection from "./Comment";
import type { Post } from "./postReducer";

interface PostProps {
  post: Post;
  currentUserId: string;
}

export default function Post({ post, currentUserId }: PostProps) {
  const dispatch = useAppDispatch();
  const [expanded, setExpanded] = useState(false);
  const [commentInput, setCommentInput] = useState("");

  const handleVote = (value: number) => {
    dispatch(votePost({ postId: post.id, userId: currentUserId, value }));
  };

  const handleCommentSubmit = () => {
    const content = commentInput.trim();
    if (!content) return;

    dispatch(addComment({ postId: post.id, authorId: currentUserId, content }));
    setCommentInput("");
  };

  return (
    <Card className="rounded-2xl shadow-md bg-white mb-4">
      <CardContent className="pb-3">
        <div className="flex items-start gap-3 mb-2">
          <Avatar>{post.author?.charAt(0).toUpperCase()}</Avatar>
          <div className="flex-1">
            <div className="flex justify-between items-center">
              <Typography variant="subtitle1" className="font-semibold">
                {post.author}
              </Typography>
              {post.authorId !== currentUserId && (
                <FollowButton
                  followedId={post.authorId}
                  currentUserId={currentUserId}
                />
              )}
            </div>
            <Typography
              variant="caption"
              color="text.secondary"
              className="text-sm"
            >
              {formatDistanceToNow(new Date(post.createdAt), {
                addSuffix: true,
              })}
            </Typography>
          </div>
        </div>

        <Typography variant="body1" className="mb-3 whitespace-pre-line">
          {post.content}
        </Typography>

        <div className="flex items-center justify-between mb-2">
          <div className="flex gap-2 items-center">
            <IconButton onClick={() => handleVote(1)}>
              <ThumbUpAltIcon fontSize="small" />
            </IconButton>
            <IconButton onClick={() => handleVote(-1)}>
              <ThumbDownAltIcon fontSize="small" />
            </IconButton>
            <Typography variant="body2" className="ml-1 text-gray-600">
              {post.votes} ({post.votesCount} total)
            </Typography>
          </div>

          <Button
            variant="text"
            size="small"
            startIcon={<ChatBubbleOutlineIcon />}
            onClick={() => setExpanded((prev) => !prev)}
          >
            {expanded ? "Hide" : "Show"} ({post.commentsCount})
          </Button>
        </div>

        <Collapse in={expanded}>
          <CommentSection comments={post.comments} />
          <div className="mt-3 space-y-2">
            <TextField
              fullWidth
              size="small"
              label="Add a comment..."
              variant="outlined"
              value={commentInput}
              onChange={(e) => setCommentInput(e.target.value)}
            />
            <Button
              variant="contained"
              size="small"
              onClick={handleCommentSubmit}
              className="ml-auto"
            >
              Post
            </Button>
          </div>
        </Collapse>
      </CardContent>
    </Card>
  );
}
