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

/* const FileInput = styled.input`
    margin-top: 10px;
`; */


export const PostNewMessage = ({ onNewPost }) => {
    const [error, setError] = useState(null);
    const [newMessage, setNewMessage] = useState("");
    /* const [imageFile, setImageFile] = useState(null); */
    const [loading, setLoading] = useState(false);

    const API_FEED_URL = import.meta.env.VITE_API_URL_DEV;


    // Function to handle text input change
    const handleInputChange = (e) => {
        const value = e.target.value;
        setNewMessage(value);
    };

    // Function to handle file input change
    /* const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
        }
    }; */


    // Simulated submit function
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);


        if(newMessage.length < 5 || newMessage.length > 140) {
            setError("The post needs to be between 5 and 140 characters long.");
            setLoading(false);
            return;
        }

        // Create FormData to send text and image
        /* const formData = new FormData();
        formData.append("title", "Post Title"); 
        formData.append("content", newMessage); 
        if (imageFile) {
            formData.append("image", imageFile); 
        }   */   

        try {
            // Send POST request to the backend
            const response = await fetch(`${API_FEED_URL}/posts`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                message: newMessage,
              }),
            });
        
            if (!response.ok) {
              throw new Error("Failed to create a new post");
            }
        
            const createdPost = await response.json();
            onNewPost(createdPost);
            // Clear the form after a successful submission
            setNewMessage("");
          } catch (err) {
            console.error("Error creating a new post:", err.message);
            setError("Failed to post your message. Please try again.");
          } finally {
            setLoading(false); // Hide the loading state
          }
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
                    {/* <FileInput
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                    />
                    {imageFile && (
                        <p>Attached: {imageFile.name}</p>
                    )} */}
                
                    <p className="character-count">{newMessage.length}/140</p>
                </InfoRow>
                <BtnRow>
                    <Button 
                        text="Send"
                        backgroundColor="#e43f3f" 
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

