import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserProfile, fetchCountries } from './actions';

const NavigationComponent = () => {
  const dispatch = useDispatch();
  const activeAccount = useSelector(state => state.activeAccount);
  const hasFetchData = useSelector(state => state.hasFetchData);

  const fetchData = async () => {
    const profileFetched = localStorage.getItem('profileFetched');

    if (activeAccount && !profileFetched) {
      await dispatch(fetchUserProfile());
      localStorage.setItem('profileFetched', 'true');
    } else if (!activeAccount) {
      localStorage.removeItem('profileFetched');
    }
  };

  useEffect(() => {
    fetchData();
  }, [activeAccount, dispatch]);

  useEffect(() => {
    dispatch(fetchCountries());
  }, [dispatch]);

  // Other component code
};

export default NavigationComponent;






import React, { useState, useEffect, useMemo } from 'react';

const Navigation = () => {
  const [activeAccount, setActiveAccount] = useState(false);
  const [hasFetchData, setHasFetchData] = useState(false);
  const [dispatch, ] = useReducer(reducer, initialState);

  const fecthData = useMemo(() => {
    return async () => {
      if (activeAccount && !hasFetchData) {
        dispatch(fetchUserProfile());
        setHasFetchData(true);
      } else if (!activeAccount) {
        setHasFetchData(false);
      }
    };
  }, [activeAccount, hasFetchData]);

  useEffect(() => {
    fecthData();
  }, [fecthData]); // Only call fecthData when the memoized function changes

  useEffect(() => {
    dispatch(fetchCountries());
  }, []);

  return (
    // ... your Navigation component content ...
  );
};

export default Navigation;



const fecthData = useMemo(() => {
  return async () => {
    if (activeAccount && !hasFetchData) {
      dispatch(fetchUserProfile());
      setHasFetchData(true);
    } else if (!activeAccount) {
      setHasFetchData(false);
    }
  };
}, [activeAccount, hasFetchData]);



useEffect(() => {
  if (!hasFetchData) {
    fecthData();
  }
}, [hasFetchData]);

useEffect(() => {
  if (activeAccount && !hasFetchData) {
    fecthData();
  }
}, [activeAccount, hasFetchData]);