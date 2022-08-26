import { useRouter } from "next/router";
import { createContext, useState, useEffect } from "react";
import { NEXT_URL } from "../config";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  // ! For testing purposes
  // const [user, setUser] = useState({ name: "brad" });
  const [error, setError] = useState(null);

  const router = useRouter();

  useEffect(() => {
    checkUserLoggedIn();
  }, []);

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
    // console.log(data);

    if (res.ok) {
      setUser(data.user);
    } else {
      setError(data.message);
    }
  };

  // Logout user
  const logout = async () => {
    const res = await fetch(`${NEXT_URL}/api/logout`, {
      method: "POST",
    });

    if (res.ok) {
      setUser(null);
      router.push("/");
    }
  };

  // Check if user is logged in
  const checkUserLoggedIn = async (user) => {
    const res = await fetch(`${NEXT_URL}`);

    const data = await res.json();
    if (res.ok) {
      setUser(data.user);
      router.push("/account/dashboard");
    } else {
      setUser(null);
    }
  };

  return <AuthContext.Provider value={{ user, error, register, login, logout }}>{children}</AuthContext.Provider>;
};

export default AuthContext;
