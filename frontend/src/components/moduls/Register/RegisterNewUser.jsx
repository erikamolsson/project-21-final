import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ContentBox } from "../../reusable/ContentBox/ContentBox";
import { Typography } from "../../reusable/Typography/Typography";
import { FormQuestion } from "../ChallengeForm/FormQuestion";
import { Button } from "../../reusable/Buttons/Buttons";


const Form = styled.form`
    padding: 1rem;
    width: 50%;
    margin: 0 auto;

    @media screen and (max-width: 762px) {
        width: 90%;
    }
`;

const Label = styled.label`
    font-family: inherit;
    border-bottom: 1px solid #6b6b6b;
`;

const Input = styled.input`
    /* border: 1px solid #6b6b6b; */
    border: none;
    padding: 0.5rem;
`;

export const RegisterNewUser = () => {
    const [formData, setFormData] = useState({
        name: "",
        alias: "",
        email: "",
        password: "",
    });

    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const API_REGISTER_URL = import.meta.env.VITE_API_URL;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value}));
    };

    // Handle image file
    /* const handleFileChange = (e) => {
        setFormData((prevData) => ({
          ...prevData,
          profileImage: e.target.files[0], 
        }));
      }; */

    // Function for handle the submit form
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
    
        try { 
          // Send to backend
          const formDataToSend = {
            name: formData.name,
            alias: formData.alias,
            email: formData.email,
            password: formData.password,
          };

          console.log("Form Data Submitted:", formDataToSend);


          // Change when deployed
          const createUser = await fetch(`${API_REGISTER_URL}/users/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formDataToSend)
          });

    
          if (!createUser.ok) {
            const errorDetails = await createUser.json();
            throw new Error(errorDetails.message || "Registration failed");
          }
    
          const result = await createUser.json();
          console.log("Result:", result); // Debug the response

            if (!result.id) {
            throw new Error("User ID not returned from the server");
            }
          // Navigate to profile page
          navigate(`/users/${result.id}`);
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
                    <Label>Name Surname</Label>
                    <Input 
                        type="text" 
                        value={formData.name} 
                        name="name" 
                        onChange={handleChange}
                        required 
                    />
                </FormQuestion>

                <FormQuestion padding="15px" margin="1rem 0">
                    <Label>Alias for “DailyChallenges”</Label>
                    <Input 
                        type="text" 
                        value={formData.alias} 
                        name="alias" 
                        onChange={handleChange}
                        required 
                    />
                </FormQuestion>

                <FormQuestion padding="15px" margin="1rem 0">
                    <Label>E-mail</Label>
                    <Input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </FormQuestion>

                <FormQuestion padding="15px" margin="1rem 0">
                    <Label>Password</Label>
                    <Input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </FormQuestion>

                {/* <FormQuestion padding="15px" margin="1rem 0">
                    <label>Profil image</label>
                    <input 
                        type="file" 
                        name="profileImage" 
                        onChange={handleFileChange} 
                    />
                </FormQuestion> */}
                <Button 
                text="Create profile"
                backgroundColor="#e43f3f" 
                width="100%"
                type="submit"
                />
                {/* <button type="submit">
                    Create profile
                </button>  */}
                {error && <p>{error}</p>}
                </Form>
            </ContentBox>
        </section>
    );
};