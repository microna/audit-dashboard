// MyContext.js
import React, { createContext, useContext, useReducer } from 'react';

// Step 1: Create a context
const MyContext = createContext();

// Step 2: Create a provider component
export const StateProvider = ({ children }) => {
   const initialState = {
      // Your initial state properties go here
      user: null
   };

   const reducer = (state, action) => {
      switch (action.type) {
         case 'USER':
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
      throw new Error('useMyContext must be used within a MyProvider');
   }
   return context;
};
