import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import ReactDOM from "react-dom/client";
import { Toaster } from "react-hot-toast";
import App from "./App";
import AuthProvider from "./contexts/AuthProvider";
import CategoryProvider from "./contexts/CategoryProvider";
import UserRoleProvider from "./contexts/UserRoleProvider";
import "./index.css";
import reportWebVitals from "./reportWebVitals";

import bannerImage from "./../src/assets/Images/Image/blurry-gradient-haikei.svg";

const queryClient = new QueryClient();
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <CategoryProvider>
        <Toaster />
        <QueryClientProvider client={queryClient}>
          <UserRoleProvider>
            <div
              className="min-h-screen bg-no-repeat bg-cover"
              style={{ backgroundImage: `url(${bannerImage})` }}
            >
              <App />
            </div>
          </UserRoleProvider>
        </QueryClientProvider>
      </CategoryProvider>
    </AuthProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
