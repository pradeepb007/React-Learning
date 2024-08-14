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