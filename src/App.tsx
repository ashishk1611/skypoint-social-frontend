import { useSelector } from "react-redux";
import "./App.css";
import Login from "./Components/Login/Login";
import NavBar from "./Components/Login/NavBar";
import NewPostForm from "./Components/Posts/NewPostForm";
import PostList from "./Components/Posts/PostList";
import { RootState } from "./store";

function App() {
  const { user, loading } = useSelector((state: RootState) => state.auth);

  if (loading) return <div className="p-6 text-center text-lg">Loading...</div>;
  if (!user) return <Login />;

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-white to-pink-50">
      <NavBar />

      <main className="flex-1 flex flex-col items-center px-4 py-6 space-y-6 w-full">
        <div className="w-full max-w-4xl">
          <NewPostForm />
        </div>
        <div className="w-full max-w-4xl">
          <PostList />
        </div>
      </main>

      <footer className="text-center py-4 text-sm text-gray-400">
        © 2025 Skypoint Social
      </footer>
    </div>
  );
}

export default App;
