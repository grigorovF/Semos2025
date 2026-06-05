import { createContext, useContext, useEffect, useState } from "react";
const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyToken = async () => {
      const storedToken = localStorage.getItem("token");
      const storedUser = localStorage.getItem("user");

      if (storedToken && storedUser) {
        try {
          // 1. Прво го вчитуваме тоа што е локално за корисникот да не чека празен екран
          const parsedUser = JSON.parse(storedUser);
          setUser(parsedUser);

          // 2. БЕЗБЕДНОСТ: Прашуваме бекенд дали токенот е навистина валиден
          // Одкоментирај го овој дел кога ќе ја имаш спремно рутата на бекенд:
          /*
          const response = await fetch("http://localhost:5000/api/auth/verify", {
            headers: {
              "Authorization": `Bearer ${storedToken}`
            }
          });

          if (!response.ok) {
            // Ако бекендот каже дека токенот не чини (401/403), фрламе грешка за да отиде во catch
            throw new Error("Token expired or invalid");
          }

          const freshData = await response.json();
          setUser(freshData.user); // Го ажурираме корисникот со свежи податоци
          localStorage.setItem("user", JSON.stringify(freshData.user));
          */
        } catch (err) {
          console.error("Auth verification failed:", err);
          // Чистиме сè ако нешто е сомнително или истечено
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          setUser(null);
        }
      }
      setLoading(false);
    };

    verifyToken();
  }, []); // Празен низа значи дека ова се извршува САМО ЕДНАШ при вчитување на апликацијата

  const login = (data) => {
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));
    setUser(data.user);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    // navigate("/"); // Редиректирај на почетната страница по логаут
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
