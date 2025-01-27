import { useEffect } from "react";
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
    const { user } = useUser();


    useEffect(() => {

        if (token) {
            const fetchProfile = async () => {
                const token = localStorage.getItem("token");

                const response = await fetch("http://localhost:5000/users/profile", {
                    method: "GET", 
                    headers: {
                        "Authorization": `Bearer ${token}`, 
                        "Content-Type": "application/json", 
                    },
                    body: JSON.stringify(data),
                });
                const data = await response.json();
                loginUser(data); // Update context with fetched data
            };
            fetchProfile();
        }
    }, [token]);

    return (
        <section>
            <Typography variant="h2">
                Your information
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
                text="Save my information"
                backgroundColor="#91BB97" 
                width="100%"
                /* onClick={handleCompleteChallenge} */
            />
        </section>
    );
};