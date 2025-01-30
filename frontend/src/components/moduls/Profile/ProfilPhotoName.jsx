/* import { useEffect } from "react"; */
import styled from "styled-components";
import { Typography } from "../../reusable/Typography/Typography";
import { useUser } from "../../../context/UserContext";


const SectionProfile = styled.section`
    margin: 3rem 0 1rem;
`;

const PhotoName = styled.article`
    display: flex;
    justify-content: space-around;
    align-items: center;
`;

const ProfilePhoto = styled.img`
    height: 200px;
    width: 200px;
    object-fit: cover;
    border-radius: 50%;
`;

const ProfileName = styled.article`
    display: flex;
    flex-direction: column;
`;


export const ProfilePhotoName = () => {
    const { user } = useUser(); // Access user data from context


    // useEffect(() => {
    //     // Fetch profile only if user is null and token is available
    //     if (!user && token) {
    //         const fetchProfile = async () => {
    //             try {
    //                 const response = await fetch("http://localhost:5000/users/profile", {
    //                     method: "GET", 
    //                     headers: {
    //                         "Authorization": `Bearer ${token}`, 
    //                         "Content-Type": "application/json", 
    //                     },
    //                 });

    //                 if (!response.ok) {
    //                     throw new Error("Failed to fetch profile");
    //                 }

    //                 const data = await response.json();
    //                 console.log("Fetched Profile Data:", data); 
    //                 loginUser(data); // Update context with fetched data
    //             } catch (err) {
    //                 console.error("Error fetching profile:", err.message);
    //             }
    //         };

    //         fetchProfile();
    //     }
    // }, [user, token, loginUser]);

    
    if (!user) {
        return <p>Loading...</p>; // Show loading if user data is not available yet
    }
    
    
    return (
        <SectionProfile>
            <Typography variant="h1">
                Welcome {user.name}
            </Typography>
            <PhotoName>
                <ProfilePhoto src="public/assets/IMG_2734.jpeg" alt="Profile picture"/>
                <ProfileName>
                    <Typography variant="p" fontWeight="bold">
                        {user.name}
                    </Typography>
                    <Typography variant="p">
                        {user.alias}
                    </Typography>
                </ProfileName>
            </PhotoName>
        </SectionProfile>
    );
};