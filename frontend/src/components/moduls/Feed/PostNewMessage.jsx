import { useState } from "react";
import styled from "styled-components";
import { Typography } from "../../reusable/Typography/Typography";
import { Button } from "../../reusable/Buttons/Buttons";
import { ContentBox } from "../../reusable/ContentBox/ContentBox";


export const WriteMessage = styled.form`
    width: 100%;
`;

export const TextArea = styled.textarea`
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    width: 100%;
    resize: none;
    overflow: auto;
    padding: 10px;
    margin-bottom: 10px;
    border: none;
`;

const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: start;
  font-size: 0.8rem;
  margin-top: 0.5rem;
`;

const BtnRow = styled.div`
    text-align: end;
`;

const FileInput = styled.input`
    margin-top: 10px;
`;


export const PostNewMessage = ({ onNewMessage }) => {
    const [error, setError] = useState(null);
    const [newMessage, setNewMessage] = useState("");
    const [imageFile, setImageFile] = useState(null);
    const [loading, setLoading] = useState(false);


    // Function to handle text input change
    const handleInputChange = (e) => {
        const value = e.target.value;
        setNewMessage(value);
    };

    // Function to handle file input change
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
        }
    };


    // Simulated submit function
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!newMessage.trim()) {
            setError("Message cannot be empty");
            return;
        }
        setLoading(true);

        // Simulating the submission of message and image
        const formData = new FormData();
        formData.append("message", newMessage);
        if (imageFile) {
            formData.append("image", imageFile);
        }

        // Simulating API call
        setTimeout(() => {
            onNewMessage({ text: newMessage, image: imageFile?.name }); // Replace with real API logic
            setNewMessage("");
            setImageFile(null);
            setLoading(false);
            setError(null);
        }, 1000);
    };

    
    return (
        <section>
        <Typography variant="h1">
            Share your progress
        </Typography>
        <ContentBox margin="20px 0">
            <Typography 
                variant="p" 
                fontWeight="bold"
            >
                Post your progress!
            </Typography>
            <WriteMessage 
                id="form-new-message" 
                className="update-feed-box" 
                onSubmit={handleSubmit}
            >
                <TextArea
                    type="text"
                    value={newMessage}
                    placeholder="Start sharing!"
                    onChange={handleInputChange} 
                    min="5" 
                    max="140"
                    required
                />
                <InfoRow>
                    <FileInput
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                    />
                    {imageFile && (
                        <p>Attached: {imageFile.name}</p>
                    )}
                
                    <p className="character-count">{newMessage.length}/140</p>
                </InfoRow>
                <BtnRow>
                    <Button 
                        text="Send"
                        backgroundColor="#E75757" 
                        /* onClick={handleStartChallenge} */
                        type="submit" 
                        disabled={loading}
                    />
                </BtnRow>
            {error && <p className="error">{error}</p>}
            </WriteMessage>  
        </ContentBox>
        </section>
    );
};

