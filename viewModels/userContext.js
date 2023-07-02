import { createContext, useContext } from "react";
export { UserContext, useUser }

// Create a Context object
const UserContext = createContext();

// Function to use the user context
function useUser(){
  const context = useContext(UserContext);

  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }

  return context;
}