import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { ContentBox } from "../../reusable/ContentBox/ContentBox";



export const ProfileID = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  console.log("Token from localStorage:", token);


  useEffect(() => {
    const fetchUserProfile = async () => {

      if (!token) {
        setError("You must be logged in to view this page.");
        navigate("/");
        return;
      }

      try {
        const response = await fetch(`http://localhost:5000/users/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch user profile");
        }

        const data = await response.json();
        setUser(data);
        console.log(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchUserProfile();
  }, [id]);

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
