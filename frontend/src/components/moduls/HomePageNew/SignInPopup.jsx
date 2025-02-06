import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components"
import { Typography } from "../../reusable/Typography/Typography";
import { Button } from "../../reusable/Buttons/Buttons";
import { useUser } from "../../../context/UserContext";


const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: ${({ isVisible }) => (isVisible ? "block" : "none")};
  z-index: 1000;
`;

const Popup = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 400px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 20px;
  z-index: 1001;
`;

const Input = styled.input`
  width: calc(100% - 20px);
  padding: 10px;
  margin: 10px 0;
  font-size: 1em;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 1.5em;
  cursor: pointer;
`;



export const SignInPopup = ({ isVisible, togglePopup}) => {
    const [alias, setAlias] = useState("");
    const [password, setPassword] = useState("");
    const { loginUser } = useUser();
    const navigate = useNavigate(); 
    const inputRef = useRef(null);

    const API_SIGN_IN_URL = import.meta.env.VITE_API_URL_DEV;

    /* const token = localStorage.getItem("token"); */

    useEffect(() => {
      if (isVisible && inputRef.current) {
          inputRef.current.focus(); // Auto-focus input when modal opens
      }
    }, [isVisible]);

    const handleKeyPress = (e) => {
      if (e.key === "Enter") {
          handleLogin(); // Submit form on Enter key press
      }
    };

    // Login logic
    const handleLogin = async () => {
        try {
            const response = await fetch(`${API_SIGN_IN_URL}/users/login`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ alias, password }),
            });
      
            if (!response.ok) {
              const errorDetails = await response.json();
                throw new Error(errorDetails.message || "Failed to log in");
            }

            // Parse the response and save the token
            const userData = await response.json();
            loginUser(userData);
            console.log("User", userData)

            // Close the popup and navigate to profile
            togglePopup(); // Close the popup
            navigate("/profile"); // Navigate to profile page
          } catch (err) {
            console.error(err.message);
          }
    };

    return (
        <section>
            <Overlay isVisible={isVisible}>
                <Popup>
                    <CloseButton onClick={togglePopup}>&times;</CloseButton>
                    <Typography variant="h2">
                        Logga in
                    </Typography>
                    <Input
                        ref={inputRef}
                        type="text"
                        placeholder="Alias"
                        value={alias}
                        onChange={(e) => setAlias(e.target.value)}
                        onKeyDown={handleKeyPress}
                    />
                    <Input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onKeyDown={handleKeyPress}
                    />
                    <Button 
                        text="Sign in!"
                        backgroundColor="#e43f3f" 
                        width="100%"
                        onClick={handleLogin} 
                    />
                </Popup>
            </Overlay>
        </section>
    );
};