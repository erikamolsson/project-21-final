import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ContentBox } from "../../reusable/ContentBox/ContentBox";
import { Typography } from "../../reusable/Typography/Typography";
import { FormQuestion } from "../ChallengeForm/FormQuestion";
import { Button } from "../../reusable/Buttons/Buttons";


const Form = styled.form`
    padding: 1rem;
`;

const Input = styled.input`
    border: 1px solid #333333;
`;

export const RegisterNewUser = () => {
    const [formData, setFormData] = useState({
        name: "",
        alias: "",
        email: "",
        password: "",
        profileImage: null,
    });

    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value}));
    };

    // Handle image file
    const handleFileChange = (e) => {
        setFormData((prevData) => ({
          ...prevData,
          profileImage: e.target.files[0], 
        }));
      };

    // Function for handle the submit form
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
    
        try {
          // Send to backend
          const formDataToSend = new FormData();
          formDataToSend.append("name", formData.name);
          formDataToSend.append("alias", formData.alias);
          formDataToSend.append("email", formData.email);
          formDataToSend.append("password", formData.password);
          if (formData.profileImage) {
            formDataToSend.append("profileImage", formData.profileImage);
          }
          // Change when deployed
          const response = await fetch("http://localhost:8080/api/users/register", {
            method: "POST",
            body: formDataToSend,
          });
    
          if (!response.ok) {
            throw new Error("Registration failed");
          }
    
          const result = await response.json();
    
          // Navigate to profile page
          navigate(`/profile/${result.userId}`);
        } catch (err) {
          setError(err.message || "Something went wrong.");
        }
      };  


    return (
        <section>
            <Typography variant="h1">
                Fill in your information to start your daily challenges!
            </Typography>
            <ContentBox>
                <Form onSubmit={handleSubmit}>

                <FormQuestion padding="15px" margin="1rem 0">
                    <label>Name Surname</label>
                    <Input 
                        type="text" 
                        value={formData.name} 
                        name="name" 
                        onChange={handleChange}
                        required 
                    />
                </FormQuestion>

                <FormQuestion padding="15px" margin="1rem 0">
                    <label>Alias for “DailyChallenges”</label>
                    <Input 
                        type="text" 
                        value={formData.alias} 
                        name="alias" 
                        onChange={handleChange}
                        required 
                    />
                </FormQuestion>

                <FormQuestion padding="15px" margin="1rem 0">
                    <label>E-mail</label>
                    <Input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </FormQuestion>

                <FormQuestion padding="15px" margin="1rem 0">
                    <label>Password</label>
                    <Input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </FormQuestion>

                <FormQuestion padding="15px" margin="1rem 0">
                    <label>Profil image</label>
                    <input type="file" name="profileImage" onChange={handleFileChange} />
                </FormQuestion>

                <Button 
                    text="Create profile"
                    backgroundColor="#E75757"
                    width="100%"
                    type="submit"
                    /* onClick={submitForm} */
                />
                {error && <p>{error}</p>}
                </Form>
            </ContentBox>
        </section>
    );
};