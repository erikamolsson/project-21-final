import { useState } from "react";
import { Typography } from "../../reusable/Typography/Typography";
import { ContentBox } from "../../reusable/ContentBox/ContentBox";
import { FormQuestion } from "./FormQuestion";
import { Button } from "../../reusable/Buttons/Buttons";
import { RadioButtons } from "./RadioButtons";
import { SliderCount } from "./SliderCount";
import { ChalendarStart } from "./ChalendarStart";
import { useUser } from "../../../context/UserContext";

export const ChallengeForm = () => {
  const [category, setCategory] = useState("");
  const [time, setTime] = useState("");
  const [daysPerWeek, setDaysPerWeek] = useState(1);
  const [startDate, setStartDate] = useState(null);
  const [filteredChallenges, setFilteredChallenges] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { token } = useUser();

  const API_CHALLENGES_URL = import.meta.env.VITE_API_URL_DEV;

  // Handle form submission
  const handleSubmit = async () => {
    console.log("Challenge:", token);

    const formData = {
      category,
      time,
      daysPerWeek,
      startDate
    };
  
    try {
      // Retrieve the token from localStorage
      if (!token) {
      console.error("No token found. User must be logged in.");
      alert("You must be logged in to start challenges.");
      return;
    }
      // Submit form data to the backend to start the challenge period
      const response = await fetch(`${API_CHALLENGES_URL}/challenges/start`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error response from backend:", errorData);
        throw new Error("Failed to start challenge period");
      }
  
      const data = await response.json();
      console.log("Challenge period started successfully:", data);
      setIsSubmitted(true); // Mark form as submitted
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };
  

  if (isSubmitted) {
    return (
      <section>
        <Typography variant="h1">Your Selected Challenges</Typography>
        <ContentBox>
          {filteredChallenges && filteredChallenges.length > 0 ? (
            filteredChallenges.map((challenge) => (
              <div key={challenge.id}>
                <Typography variant="h2">{challenge.title}</Typography>
                <Typography variant="p">{challenge.text}</Typography>
              </div>
            ))
          ) : (
            <Typography variant="p">No challenges were selected based on your preferences.</Typography>
          )}
        </ContentBox>
        <Button
          text="Go back"
          backgroundColor="#e43f3f"
          width="100%"
          onClick={() => setIsSubmitted(false)}
        />
      </section>
    );
  }

  return (
    <section>
      <Typography variant="h1">Set your daily challenge preferences</Typography>
      <ContentBox>
        <FormQuestion padding="15px" margin="1rem 0">
          <Typography variant="label">
            What category do you wanna challenge yourself in?
          </Typography>
          <RadioButtons
            options={[
              { label: "Challenges Outside", value: "Challenges Outside" },
              { label: "Challenges Money", value: "Challenges Money" },
              { label: "Challenges Self Growth", value: "Challenges Self Growth" },
              { label: "Challenges Social", value: "Challenges Social" },
              { label: "Challenges Active", value: "Challenges Active" },
              { label: "Choose for me!", value: "chooseForMe" },
            ]}
            name="category"
            value={category}
            onChange={(value) => setCategory(value)}
          />
        </FormQuestion>

        <FormQuestion padding="15px" margin="1rem 0">
          <Typography variant="label">
            How long period for challenges?
          </Typography>
          <RadioButtons
            options={[
              { label: "One week", value: "One week" },
              { label: "Three weeks", value: "Three weeks" },
              { label: "One month", value: "One month" },
              { label: "Three months", value: "Three months" },
            ]}
            name="time"
            value={time}
            onChange={(value) => setTime(value)}
          />
        </FormQuestion>

        <FormQuestion padding="15px" margin="1rem 0">
          <Typography variant="label">
            How many challenges per week?
          </Typography>
          <SliderCount
            label="Days"
            value={daysPerWeek}
            min={1}
            max={7}
            step={1}
            onChange={(value) => setDaysPerWeek(value)}
          />
        </FormQuestion>

        <FormQuestion padding="15px" margin="1rem 0">
          <Typography variant="label">
            When do you wanna start?
          </Typography>
          <ChalendarStart
            label="Select your start date"
            onDateChange={(date) => setStartDate(date)} // Update chosen date
          />
          {startDate && (
            <Typography variant="p">
              You selected:{" "}
              <strong>{startDate.toLocaleDateString("en-US")}</strong>
            </Typography>
          )}
        </FormQuestion>

        <Button
          text="Start challenges!"
          backgroundColor="#e43f3f"
          width="100%"
          onClick={handleSubmit}
        />
      </ContentBox>
    </section>
  );
};
