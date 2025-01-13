import { ProfileInfo } from "../components/moduls/Profile/ProfileInfo";
import { ProfilePhotoName } from "../components/moduls/Profile/ProfilPhotoName";
import { ProfileSettings } from "../components/moduls/Profile/ProfileSettings";


export const ProfileUser = () => {
    return (
        <section>
            <ProfilePhotoName />
            <ProfileSettings />
            <ProfileInfo />
        </section>
    );
};