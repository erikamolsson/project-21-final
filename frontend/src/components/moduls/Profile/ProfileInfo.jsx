import { useState } from "react";
import styled from "styled-components";
import { ContentBox } from "../../reusable/ContentBox/ContentBox";
import { Typography } from "../../reusable/Typography/Typography";
import { Button } from "../../reusable/Buttons/Buttons";
import { useUser } from "../../../context/UserContext";


const Article = styled.article`
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #000;
`;

export const ProfileInfo = () => {
    const { user, token } = useUser();
    const [loading, setLoading] = useState(true);

    console.log("Token - Info:", token);

    // useEffect(() => {
    //     if (token) {
    //         const fetchProfile = async () => {
    //             try {
    //             const response = await fetch("http://localhost:5000/users/profile", {
    //                 method: "GET", 
    //                 headers: {
    //                     "Authorization": `Bearer ${token}`, 
    //                     "Content-Type": "application/json", 
    //                 }
    //             });
    //             const data = await response.json();
    //                 console.log("User Data:", data);
    //                 loginUser(data); // Update context with fetched data
    //             } catch (error) {
    //                 console.error("Failed to fetch profile:", error);
    //             } finally {
    //                 setLoading(false); // Hide loading state
    //             }
    //         };
    //         fetchProfile();
    //     } else {
    //         setLoading(false); // No token, no fetch
    //     }
    // }, [token, loginUser]);

    return (
        <section>
            <Typography variant="h2">
                My information
            </Typography>
            <ContentBox>
                <Article>
                    <Typography variant="p" >
                        Password
                    </Typography>
                    <Typography variant="p" fontWeight="bold">
                        ********
                    </Typography>
                </Article>
                <Article>
                <Typography variant="p" >
                        Alias
                    </Typography>
                    <Typography variant="p">
                        {user?.alias || "Alias not available"}
                    </Typography>
                </Article>
                <Article>
                <Typography variant="p" >
                        Name
                    </Typography>
                    <Typography variant="p">
                        {user?.name || "Name not available"}
                    </Typography>
                </Article>
            </ContentBox>
            <Button 
                text="Change my information"
                backgroundColor="#91BB97" 
                width="100%"
                /* onClick={handleCompleteChallenge} */
            />
        </section>
    );
};