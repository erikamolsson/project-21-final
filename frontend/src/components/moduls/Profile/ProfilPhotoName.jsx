import styled from "styled-components";
import { Typography } from "../../reusable/Typography/Typography";



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
    return (
        <section>
            <Typography variant="h1">
                Your profile
            </Typography>
            <PhotoName>
                <ProfilePhoto src="public/assets/IMG_2734.jpeg" alt="Profile picture"/>
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