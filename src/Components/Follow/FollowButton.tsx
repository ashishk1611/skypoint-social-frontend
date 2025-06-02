import { Button } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../store";
import { followUser, unfollowUser } from "./followReducer";

export default function FollowButton({
  followedId,
  currentUserId,
}: {
  followedId: string;
  currentUserId: string;
}) {
  const dispatch = useAppDispatch();
  const isFollowing = useSelector((state: RootState) =>
    state.follow.following.some((user) => user.followedId === followedId)
  );

  const handleClick = () => {
    if (isFollowing) {
      dispatch(unfollowUser({ followerId: currentUserId, followedId }));
    } else {
      dispatch(followUser({ followerId: currentUserId, followedId }));
    }
  };

  return (
    <Button variant="contained" size="small" onClick={handleClick}>
      {isFollowing ? "Unfollow" : "Follow"}
    </Button>
  );
}
