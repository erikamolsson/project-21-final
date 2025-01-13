import styled from "styled-components";
import { Typography } from "../../reusable/Typography/Typography";



const PhotoName = styled.article`
    display: flex;
    justify-content: space-around;
    align-items: center;
`;

const PhotoBox = styled.div`
    border-radius: 50%;
    width: 300px;
    height: 300px;
    object-fit: cover;
`;

const ProfilePhoto = styled.img`
    height: auto;
    width: 100%;
`;

const ProfileName = styled.article`
    display: flex;
    flex-direction: column;
`;


export const ProfilePhotoName = () => {
    return (
        <section>
            <Typography variant="h1">
                Your profile
            </Typography>
            <PhotoName>
                <PhotoBox>
                    <ProfilePhoto src="public/assets/tjej-app.png" alt="Profile picture"/>
                </PhotoBox>
                <ProfileName>
                    <Typography variant="p" fontWeight="bold">
                        Name Surname
                    </Typography>
                    <Typography variant="p">
                        User Alias
                    </Typography>
                </ProfileName>
            </PhotoName>
        </section>
    );
};