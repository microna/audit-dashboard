// MyContext.js
import React, { createContext, useContext, useReducer } from "react";
import { jwtDecode } from "jwt-decode";

// Step 1: Create a context
const MyContext = createContext();

// Step 2: Create a provider component
export const StateProvider = ({ children }) => {
  // Step 3: Set up a reducer and initial state
  const token = localStorage.getItem("token") ?? undefined;
  const initialState = {
    // Your initial state properties go here
    user: token ? jwtDecode(token) : undefined,
  };

  const reducer = (state, action) => {
    // Handle state changes based on action type
    switch (action.type) {
      case "USER":
        return { ...state, user: action.payload };

      default:
        return state;
    }
  };

  // Step 4: Use useReducer to manage state
  const [state, dispatch] = useReducer(reducer, initialState);

  // Step 5: Provide the state and dispatch function to the context
  const value = { state, dispatch };

  return <MyContext.Provider value={value}>{children}</MyContext.Provider>;
};

// Step 6: Create a custom hook for using the context
export const useMyContext = () => {
  const context = useContext(MyContext);
  if (!context) {
    throw new Error("useMyContext must be used within a MyProvider");
  }
  return context;
};
