import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { ContentBox } from "../../reusable/ContentBox/ContentBox";
import { useUser } from "../../../context/UserContext";




export const ProfileID = () => {
  const { id } = useParams();
  /* const [user, setUser] = useState(null); */
  const { user, token } = useUser();
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  console.log("Token from context:", token);
  console.log("🟡 ID from URL params:", id);


  /* useEffect(() => {
    const fetchUserProfile = async () => {

      try {
        const response = await fetch(`http://localhost:5000/users/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        });

        console.log("🔍 Response Status:", response.status);
        console.log("bearer:", token);

        if (!token) {
          setError("You must be logged in to view this page.");
          navigate("/");
          return;
        }

        if (!response.ok) {
          throw new Error("Failed to fetch user profile");
        }

        const data = await response.json();
        setUser(data);
        console.log("Fetched user profile:", data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchUserProfile();
  }, [id, token, setUser]); */

  if (!token) {
    setError("You must be logged in to view this page.");
    navigate("/");
    return;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <section>
      <ContentBox>
        <h1>Welcome, {user.name}</h1>
        <p>Alias: {user.alias}</p>
        <p>Email: {user.email}</p>
      </ContentBox>
    </section>
  );
};
