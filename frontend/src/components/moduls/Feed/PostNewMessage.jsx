import { useState } from "react";
import styled from "styled-components";
import { Typography } from "../../reusable/Typography/Typography";
import { Button } from "../../reusable/Buttons/Buttons";
import { ContentBox } from "../../reusable/ContentBox/ContentBox";


export const WriteMessage = styled.form`
    background-color: #fff;
    width: 100%;
    border: none;
`;

export const PostNewMessage = ({ onNewMessage }) => {
    const [error, setError] = useState(null);
    const [newMessage, setNewMessage] = useState("");
    const [loading, setLoading] = useState(false);


    // Function to handle text input change
    const handleInputChange = (e) => {
        const value = e.target.value;
        setNewMessage(value);
    };
    
    return (
        <section>
        <Typography
            variant="h1"
        >
            Share your progress
        </Typography>
        <ContentBox
            margin="20px"
        >
            <Typography 
                variant="p" 
                fontWeight="bold"
            >
                Post your progress!
            </Typography>
            <WriteMessage 
                id="form-new-message" 
                className="update-feed-box" 
                /* onSubmit={handleSubmitMessageFeed} */
            >
                <textarea
                    type="text"
                    value={newMessage}
                    placeholder="Start sharing!"
                    onChange={handleInputChange} 
                    min="5" 
                    max="140"
                    required
                />
            </WriteMessage>
            <p className="character-count">{newMessage.length}/140</p>
            <Button 
                text="Send"
                backgroundColor="#E75757" 
                /* onClick={handleStartChallenge} */
                type="submit" 
                disabled={loading}
            />
            {error && <p className="error">{error}</p>}
        </ContentBox>
        </section>
    );
};

