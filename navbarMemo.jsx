import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserProfile, fetchCountries, fetchEvents } from './yourActions'; // Replace with your actual imports

const NavBar = () => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.userData);
  const customerId = userData?.customerId;

  // State to track if the data has been fetched
  const [hasFetchedData, setHasFetchedData] = useState(false);

  // Memoized values
  const memoizedUserData = useMemo(() => userData, [userData]);
  const memoizedCustomerId = useMemo(() => customerId, [customerId]);

  useEffect(() => {
    if (memoizedUserData && !hasFetchedData) {
      fetchData();
    }
  }, [memoizedUserData, dispatch]);

  const fetchData = async () => {
    if (memoizedUserData && !hasFetchedData) {
      await dispatch(fetchUserProfile());
      setHasFetchedData(true);
    }
  };

  useEffect(() => {
    dispatch(fetchCountries());
  }, [dispatch]);

  useEffect(() => {
    if (memoizedCustomerId) {
      dispatch(fetchEvents(memoizedCustomerId));
    }
  }, [memoizedCustomerId, dispatch]);

  return (
    <nav data-testid="navbar">
      {/* Your Navbar content */}
    </nav>
  );
};

export default NavBar;