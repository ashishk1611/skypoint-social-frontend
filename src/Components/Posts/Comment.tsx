import { Avatar, Divider, Typography } from "@mui/material";
import { formatDistanceToNow } from "date-fns";
import type { Comment } from "./postReducer";

interface CommentSectionProps {
  comments: Comment[];
}

export default function CommentSection({ comments }: CommentSectionProps) {
  if (!comments || comments.length === 0) return null;

  return (
    <>
      <Divider className="my-3" />
      <div className="space-y-4">
        {comments.map((comment) => (
          <div
            key={comment.id}
            className="flex items-start space-x-3 bg-gray-50 p-3 rounded-xl shadow-sm"
          >
            <Avatar sx={{ width: 32, height: 32 }}>
              {comment.author?.charAt(0).toUpperCase()}
            </Avatar>
            <div>
              <div className="flex items-center gap-2 text-sm text-gray-700">
                <span className="font-medium">{comment.author}</span>
                <span className="text-gray-500 text-xs">
                  {formatDistanceToNow(new Date(comment.createdAt), {
                    addSuffix: true,
                  })}
                </span>
              </div>
              <Typography
                variant="body2"
                className="text-gray-800 mt-1 leading-relaxed"
              >
                {comment.content}
              </Typography>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
