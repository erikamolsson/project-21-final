import { useEffect, useState } from "react";


export const Dashboard = () => {
  const [dailyChallenge, setDailyChallenge] = useState(null);
  const [error, setError] = useState("");
  const { token } = useUser();

  const API_FETCH_CHALLENGE_URL = import.meta.env.VITE_API_URL_PROD;

  const fetchDailyChallenge = async () => {
    try {
      const response = await fetch(`${API_FETCH_CHALLENGE_URL}/challenges/random`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch the daily challenge");
      }

      const data = await response.json();
      setDailyChallenge(data); // Save the challenge to state
    } catch (err) {
      console.error("Error fetching daily challenge:", err);
      setError("Could not fetch today's challenge.");
    }
  };

  // Fetch the daily challenge when the component mounts
  useEffect(() => {
    fetchDailyChallenge();
  }, []);

  return (
    <section>
      <h1>Your Daily Challenge</h1>
      {error && <p>{error}</p>}
      {dailyChallenge ? (
        <div>
          <h2>{dailyChallenge.title}</h2>
          <p>{dailyChallenge.text}</p>
        </div>
      ) : (
        <p>Loading your challenge...</p>
      )}
    </section>
  );
};
