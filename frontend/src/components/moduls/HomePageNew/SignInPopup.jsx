import { useState } from "react";
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
    const navigate = useNavigate(); // useNavigate hook

    const token = localStorage.getItem("token");

    // Login logic
    const handleLogin = async () => {
        try {
            const response = await fetch("http://localhost:5000/users/login", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ alias, password }),
            });

            // Log response for debugging
            console.log("Response Status:", response.status);
            console.log("Response Details:", response);
            console.log("Token:", token);
      
            if (!response.ok) {
              const errorDetails = await response.json();
                throw new Error(errorDetails.message || "Failed to log in");
            }

            // Parse the response and save the token
            const userData = await response.json();// Save token in localStorage
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
                        type="text"
                        placeholder="Alias"
                        value={alias}
                        onChange={(e) => setAlias(e.target.value)}
                    />
                    <Input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button 
                        text="Sign in!"
                        backgroundColor="#E75757" 
                        width="100%"
                        onClick={handleLogin} 
                    />
                </Popup>
            </Overlay>
        </section>
    );
};