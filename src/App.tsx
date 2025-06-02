import { useSelector } from "react-redux";
import "./App.css";
import Login from "./Components/Login/Login";
import NewPostForm from "./Components/Posts/NewPostForm";
import PostList from "./Components/Posts/PostList";
import { RootState } from "./store";

function App() {
  const { user, loading } = useSelector((state: RootState) => state.auth);

  if (loading) return <div className="p-6 text-center text-lg">Loading...</div>;
  if (!user) return <Login />;

  return (
    <main className="flex-1 flex flex-col items-center px-4 py-6 space-y-6 w-full">
      <div className="w-full max-w-4xl">
        <NewPostForm />
      </div>
      <div className="w-full max-w-4xl">
        <PostList />
      </div>
    </main>
  );
}

export default App;
