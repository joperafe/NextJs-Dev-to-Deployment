import { createContext, useState, useEffect } from "react";
import { NEXT_URL } from "../config";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  // ! For testing purposes
  // const [user, setUser] = useState({ name: "brad" });
  const [error, setError] = useState(null);

  // Register user
  const register = async (user) => {
    console.log(user);
  };

  // Login user
  const login = async ({ email: identifier, password }) => {
    const res = await fetch(`${NEXT_URL}/api/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ identifier, password }),
    });

    const data = await res.json();
    console.log(data);

    if (res.ok) {
      setUser(data.user);
    } else {
      setError(data.message);
    }
  };

  // Logout user
  const logout = async () => {
    console.log("logout");
  };

  // Check if user is logged in
  const checkUserLoggedIn = async (user) => {
    console.log("check", user);
  };

  return <AuthContext.Provider value={{ user, error, register, login, logout }}>{children}</AuthContext.Provider>;
};

export default AuthContext;
