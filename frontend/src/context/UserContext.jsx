import { createContext, useState, useContext, useEffect } from "react";

// Create context
export const UserContext = createContext();

// Provider component to wrap the app
export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);

    // Function to log in the user
    const loginUser = (userData) => {
        setUser(userData);
        setToken(userData.token);
        localStorage.setItem("token", userData.token);
        console.log("🚀 Token updated in context:", userData.token);
    };

    // Function to log out the user
    const logoutUser = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem("token");
    };

    // Check localStorage for an existing token on initialization
    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        if (storedToken) {
            setToken(storedToken); // Set token in state
        }
    }, []);


    return (
        <UserContext.Provider value={{ user, setUser, loginUser, token, logoutUser }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);

