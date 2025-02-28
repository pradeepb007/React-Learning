import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import SignIn from "./pages/SignIn";
import PageLayout from "./components/PageLayout/PageLayout";
import { getAccessToken, refreshAccessToken } from "./auth/pingInstance";
import { fetchUserProfile } from "./userProfileSlice";
import DefaultLoader from "./components/DefaultLoader";

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const App = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isUserProfileCalled, setIsUserProfileCalled] = useState(false);
  const { fetchAttempted } = useSelector((state) => state.userProfile);
  const hasFetched = useRef(false);
  const queryParams = useQuery();
  const authCode = queryParams.get("code");

  useEffect(() => {
    const checkAuth = async () => {
      const storedAccessToken = sessionStorage.getItem("accessToken");

      if (storedAccessToken) {
        setIsAuthenticated(true);
      } else if (authCode && !hasFetched.current) {
        hasFetched.current = true;
        const accessToken = await getAccessToken(authCode);
        if (accessToken) {
          setIsAuthenticated(true);
        }
      }
    };

    checkAuth();
  }, [authCode]);

  useEffect(() => {
    const setStoreData = async () => {
      if (isAuthenticated && !isUserProfileCalled) {
        const storedUserData = JSON.parse(sessionStorage.getItem("userData"));

        if (!storedUserData && !isUserProfileCalled) {
          setIsUserProfileCalled(true);
          const response = await dispatch(fetchUserProfile());

          if (response.payload && response.payload.customerteam === false) {
            navigate("/unauthorized");
          } else if (response.error) {
            navigate("/unauthorized");
          } else {
            setIsAuthenticated(true);
          }
        } else {
          setIsAuthenticated(true);
        }
      }
    };

    setStoreData();
  }, [isAuthenticated, dispatch, fetchAttempted]);

  useEffect(() => {
    const tokenExpirationHandler = async () => {
      const expiresAt = sessionStorage.getItem("expiresAt");
      if (!expiresAt) return;

      const expirationTime = parseInt(expiresAt, 10);
      const currentTime = Math.floor(Date.now() / 1000);

      if (currentTime >= expirationTime) {
        const newAccessToken = await refreshAccessToken();
        if (newAccessToken) {
          setIsAuthenticated(true);
        }
      }
    };

    tokenExpirationHandler();
  }, []);

  if (isAuthenticated && !fetchAttempted) {
    return <DefaultLoader />;
  }

  return isAuthenticated ? (
    <PageLayout>
      <Outlet />
    </PageLayout>
  ) : (
    <SignIn />
  );
};

export default App;

import axios from "axios";

export const getAccessToken = async (authCode) => {
  if (!authCode) return null;

  try {
    const response = await axios.post("https://your-backend.com/api/auth/token", { code: authCode });

    const tokenData = response.data;
    sessionStorage.setItem("accessToken", tokenData.access_token);
    sessionStorage.setItem("refreshToken", tokenData.refresh_token);
    sessionStorage.setItem("expiresAt", String(Math.floor(Date.now() / 1000) + tokenData.expires_in));

    window.history.replaceState({}, document.title, "/");
    return tokenData.access_token;
  } catch (error) {
    console.error("Error fetching access token:", error);
    clearSession();
    return null;
  }
};

export const refreshAccessToken = async () => {
  const refreshToken = sessionStorage.getItem("refreshToken");
  if (!refreshToken) {
    clearSession();
    return null;
  }

  try {
    const response = await axios.post("https://your-backend.com/api/auth/token", { refresh_token: refreshToken });

    const tokenData = response.data;
    sessionStorage.setItem("accessToken", tokenData.access_token);
    sessionStorage.setItem("refreshToken", tokenData.refresh_token);
    sessionStorage.setItem("expiresAt", String(Math.floor(Date.now() / 1000) + tokenData.expires_in));

    return tokenData.access_token;
  } catch (error) {
    console.error("Error refreshing access token:", error);
    clearSession();
    return null;
  }
};

const clearSession = () => {
  sessionStorage.removeItem("accessToken");
  sessionStorage.removeItem("expiresAt");
  sessionStorage.removeItem("refreshToken");
  window.location.href = "/signin";
};

