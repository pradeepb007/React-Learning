import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import SignIn from "./pages/SignIn";
import PageLayout from "./components/PageLayout/PageLayout";
import {
  MsalProvider,
  AuthenticationTemplate,
  UnauthenticatedTemplate,
} from "@azure/msal-react";
import msalInstance, { getAccessToken } from "./auth/msalInstance";
import { Outlet, useNavigate } from "react-router";
import { fetchUserProfile } from "./userProfileSlice";
import DefaultLoader from "./components/DefaultLoader"; // Assuming you have a loader component

const App = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorDetails, setErrorDetails] = useState({ code: "", message: "" });

  // Selector to get error and status from Redux state
  const { error, status } = useSelector((state) => state.userProfileData);

  useEffect(() => {
    const handleAuthentication = async () => {
      const account = msalInstance.getActiveAccount();
      if (account) {
        const storedUserData = JSON.parse(sessionStorage.getItem("userData"));
        if (!storedUserData) {
          setIsAuthenticated(false);
          const action = await dispatch(fetchUserProfile());
          if (action.error) {
            setShowErrorModal(true);
            setErrorDetails({
              code: action.error.code || "Fetch Error",
              message: action.error.message || "An error occurred",
            });
          } else {
            setIsAuthenticated(true);
          }
        } else {
          setIsAuthenticated(true);
        }
      }
    };

    msalInstance.handleRedirectPromise().then(() => {
      setIsAuthenticated(true);
      getAccessToken();
      if (window.location.pathname === "/signin") {
        navigate("/");
      }
    });

    handleAuthentication();
  }, [dispatch, navigate]);

  const handleCloseErrorModal = () => {
    setShowErrorModal(false);
  };

  // Show loader if status is "loading"
  if (status === "loading") {
    return <DefaultLoader />;
  }

  // Show error modal if there was a fetch error
  if (status === "failed" && window.location.pathname === "/signin") {
    setShowErrorModal(true);
  }

  // Render SignIn page if not authenticated
  if (!isAuthenticated && window.location.pathname === "/signin") {
    return (
      <SignIn
        showErrorModal={showErrorModal}
        errorCode={errorDetails.code}
        error={errorDetails.message}
        handleClose={handleCloseErrorModal}
      />
    );
  }

  // Main app layout for authenticated users
  return (
    <MsalProvider instance={msalInstance}>
      <UnauthenticatedTemplate>
        <SignIn
          showErrorModal={showErrorModal}
          errorCode={errorDetails.code}
          error={errorDetails.message}
          handleClose={handleCloseErrorModal}
        />
      </UnauthenticatedTemplate>
      <AuthenticationTemplate>
        <PageLayout>
          <Outlet />
        </PageLayout>
      </AuthenticationTemplate>
    </MsalProvider>
  );
};

export default App;
