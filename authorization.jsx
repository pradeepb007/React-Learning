import axios from "axios";
import { refreshAccessToken } from "./pingInstance"; // Import refresh token function

const apiClient = axios.create({
  baseURL: "https://your-backend.com/api/auth",
});

// ** Axios Request Interceptor **
apiClient.interceptors.request.use(
  async (config) => {
    let token = sessionStorage.getItem("accessToken");
    const expiresAt = sessionStorage.getItem("expiresAt");
    const currentTime = Math.floor(Date.now() / 1000);

    // Refresh token if expired
    if (expiresAt && currentTime >= parseInt(expiresAt, 10)) {
      token = await refreshAccessToken();
    }

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    console.error("Request error:", error);
    return Promise.reject(error);
  }
);

// ** Axios Response Interceptor for Unauthorized Errors **
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response && error.response.status === 401) {
      console.warn("Unauthorized request, attempting token refresh...");
      const newToken = await refreshAccessToken();

      if (newToken) {
        error.config.headers["Authorization"] = `Bearer ${newToken}`;
        return axios(error.config); // Retry original request
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient;
import axios from "axios";

const API_BASE_URL = "https://your-backend.com/api/auth"; 

const saveTokenData = (tokenData) => {
  sessionStorage.setItem("accessToken", tokenData.access_token);
  sessionStorage.setItem("refreshToken", tokenData.refresh_token);
  sessionStorage.setItem("expiresAt", String(Math.floor(Date.now() / 1000) + tokenData.expires_in));
};

const clearSession = () => {
  sessionStorage.removeItem("accessToken");
  sessionStorage.removeItem("expiresAt");
  sessionStorage.removeItem("refreshToken");
  window.location.href = "/signin";
};

export const getAccessToken = async (authCode) => {
  if (!authCode) return null;

  try {
    const response = await axios.post(`${API_BASE_URL}/token`, { code: authCode });
    saveTokenData(response.data);
    window.history.replaceState({}, document.title, "/");
    return response.data.access_token;
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
    const response = await axios.post(`${API_BASE_URL}/token`, { refresh_token: refreshToken });
    saveTokenData(response.data);
    return response.data.access_token;
  } catch (error) {
    console.error("Error refreshing access token:", error);
    clearSession();
    return null;
  }
};

import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import SignIn from "./pages/SignIn";
import PageLayout from "./components/PageLayout/PageLayout";
import { getAccessToken } from "./auth/pingInstance";
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

