// UserContext.js
// eslint-disable-next-line no-unused-vars
import React, { createContext, useState, useContext } from "react";

// Create the UserContext
const UserContext = createContext();

// Create a custom hook to use the UserContext
// eslint-disable-next-line react-refresh/only-export-components
export const useUser = () => {
  return useContext(UserContext);
};

// Create a provider component
// eslint-disable-next-line react/prop-types
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  // Function to handle user sign-in or sign-up
  const signInOrSignUp = (userData) => {
    setUser(userData);
    // Here you might want to store the user data in local storage or make an API call to authenticate the user
  };

  // Function to handle user sign-out
  const signOut = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("sessionToken");
    localStorage.removeItem("jobs");
    localStorage.removeItem("resume");
    // Optionally, remove user data from local storage or perform other cleanup actions
  };

  const setUserDetails = (user) => {
    localStorage.setItem("user", JSON.stringify(user));
    setUser(user);
  };

  return (
    <UserContext.Provider value={{ user, signInOrSignUp, signOut, setUserDetails }}>
      {children}
    </UserContext.Provider>
  );
};
