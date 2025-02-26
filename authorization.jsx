import axios from "axios";

/**
 * Stores token details in sessionStorage
 */
const saveTokenData = ({ access_token, expires_in, refresh_token }) => {
  sessionStorage.setItem("accessToken", access_token);
  sessionStorage.setItem("expiresAt", Date.now() + expires_in * 1000); // Convert seconds to milliseconds
  sessionStorage.setItem("refreshToken", refresh_token);
};

/**
 * Fetch access token using authorization code
 */
export const getAccessToken = async () => {
  const queryParams = new URLSearchParams(window.location.search);
  const authCode = queryParams.get("code");

  let accessToken = sessionStorage.getItem("accessToken");
  let expiresAt = sessionStorage.getItem("expiresAt");

  // Check if the token exists and is still valid
  const isTokenExpired = expiresAt && Date.now() > Number(expiresAt);

  if (accessToken && !isTokenExpired) {
    return accessToken;
  }

  if (authCode) {
    try {
      const response = await axios.post("https://your-backend.com/api/auth/token", { code: authCode });

      saveTokenData(response.data);

      // Remove auth code from URL
      window.history.replaceState({}, document.title, "/");

      return response.data.access_token;
    } catch (error) {
      console.error("Error fetching access token:", error);
      clearSession();
      return null;
    }
  } else {
    return await refreshAccessToken();
  }
};

/**
 * Refresh the access token using the refresh token
 */
export const refreshAccessToken = async () => {
  const refreshToken = sessionStorage.getItem("refreshToken");

  if (!refreshToken) {
    clearSession();
    window.location.href = "/signin"; // Redirect to sign-in
    return null;
  }

  try {
    const response = await axios.post("https://your-backend.com/api/auth/token", { refresh_token: refreshToken });

    saveTokenData(response.data);

    return response.data.access_token;
  } catch (error) {
    console.error("Error refreshing access token:", error);
    clearSession();
    window.location.href = "/signin"; // Redirect if refresh fails
    return null;
  }
};

/**
 * Clears session storage when authentication fails
 */
const clearSession = () => {
  sessionStorage.removeItem("accessToken");
  sessionStorage.removeItem("expiresAt");
  sessionStorage.removeItem("refreshToken");
};



import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SignIn from "./pages/SignIn";
import PageLayout from "./components/PageLayout/PageLayout";
import { getAccessToken } from "./auth/authService";
import { fetchUserProfile } from "./userProfileSlice";
import { Outlet } from "react-router";
import { useDispatch } from "react-redux";

const App = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const authenticateUser = async () => {
      const token = await getAccessToken();

      if (token) {
        setIsAuthenticated(true);
        if (window.location.pathname === "/signin") {
          navigate("/"); // Redirect to home after sign-in
        }
      } else {
        setIsAuthenticated(false);
      }
    };

    authenticateUser();
  }, [navigate]);

  useEffect(() => {
    if (isAuthenticated) {
      const storedUserData = sessionStorage.getItem("userData");

      if (!storedUserData) {
        dispatch(fetchUserProfile()).then(() => setIsAuthenticated(true));
      }
    }
  }, [isAuthenticated, dispatch]);

  if (!isAuthenticated) {
    return <SignIn />;
  }

  return (
    <PageLayout>
      <Outlet />
    </PageLayout>
  );
};

export default App;

import axios from "axios";
import { getAccessToken } from "./auth/authService";

export const fetchUserData = async () => {
  try {
    const token = await getAccessToken();
    if (!token) throw new Error("No valid token available");

    const response = await axios.get("https://your-backend.com/api/user", {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data;
  } catch (error) {
    console.error("Failed to fetch user data:", error);
    return null;
  }
};



