import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";
import { ToastContainer } from "react-toastify";
import { UserProvider } from "./contexts/UserContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <UserProvider>
      <App />
    </UserProvider>
    <ToastContainer />
  </React.StrictMode>
);
