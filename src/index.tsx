import { GoogleOAuthProvider } from "@react-oauth/google";
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import App from "./App";
import NavBar from "./Components/Login/NavBar";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { store } from "./store";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-white to-pink-50">
      <GoogleOAuthProvider clientId="523894985019-39g7rv0978fab763an80ken2bt76er2d.apps.googleusercontent.com">
        <Provider store={store}>
          <BrowserRouter>
            <NavBar />
            <ToastContainer position="top-right" autoClose={3000} />
            <App />
          </BrowserRouter>
        </Provider>
      </GoogleOAuthProvider>
      <footer className="text-center py-4 text-sm text-gray-400">
        © 2025 Skypoint Social
      </footer>
    </div>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
