import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ContentBox } from "../../reusable/ContentBox/ContentBox";
import { Typography } from "../../reusable/Typography/Typography";
import { FormQuestion } from "../ChallengeForm/FormQuestion";
/* import { Button } from "../../reusable/Buttons/Buttons"; */


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
    });

    const [error, setError] = useState(null);
    const navigate = useNavigate();

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

          /* const formDataToSend = new FormData();
          formDataToSend.append("name", formData.name);
          formDataToSend.append("alias", formData.alias);
          formDataToSend.append("email", formData.email);
          formDataToSend.append("password", formData.password); */


          // Change when deployed
          const createUser = await fetch("http://localhost:5000/users/register", {
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

            if (!result._id) {
            throw new Error("User ID not returned from the server");
            }
          // Navigate to profile page
          navigate(`/users/${result._id}`);
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

                {/* <FormQuestion padding="15px" margin="1rem 0">
                    <label>Profil image</label>
                    <input 
                        type="file" 
                        name="profileImage" 
                        onChange={handleFileChange} 
                    />
                </FormQuestion> */}

                <button type="submit">
                    Create profile
                </button> 
                {error && <p>{error}</p>}
                </Form>
            </ContentBox>
        </section>
    );
};