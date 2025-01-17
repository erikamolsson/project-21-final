import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components"
import { Typography } from "../../reusable/Typography/Typography";
import { Button } from "../../reusable/Buttons/Buttons";


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

    const navigate = useNavigate(); // useNavigate hook

    // Login logic
    const handleLogin = () => {
        console.log("Alias:", alias);
        console.log("Password:", password);
        togglePopup();

        //When signed in user get to /profile
        navigate("/profile");
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