import { useState } from "react";
import { Typography } from "../../reusable/Typography/Typography";
import { ContentBox } from "../../reusable/ContentBox/ContentBox";
import { FormQuestion } from "./FormQuestion";
import { Button } from "../../reusable/Buttons/Buttons";
import { RadioButtons } from "./RadioButtons";
import { SliderCount } from "./SliderCount";
import { ChalendarStart } from "./ChalendarStart";




export const ChallengeForm = () => {
    const [category, setCategory] = useState("");
    const [time, setTime] = useState("");
    const [goal, setGoal] = useState("");
    const [days, setDays] = useState(1);
    const [startDate, setStartDate] = useState(null);

    const categoryOptions = [
        { label: "Category 1", value: "category1" },
        { label: "Category 2", value: "category2" },
        { label: "Category 3", value: "category3" },
        { label: "Category 4", value: "category4" },
        { label: "Category 5", value: "category5" },
        { label: "Choose for me!", value: "chooseForMe" },
    ];

    const timeOptions = [
        { label: "One week", value: "One week" },
        { label: "Three weeks", value: "Three weeks" },
        { label: "One month", value: "One month" },
        { label: "Three months", value: "Three months" },
    ];

    const goalOptions = [
        { label: "Be outside more", value: "Be outside more" },
        { label: "Self growth", value: "Self growth" },
        { label: "Meet people", value: "Meet people" },
        { label: "Be more active", value: "Be more active" },
        { label: "Save money", value: "Save money" },
    ];

    return (
        <section>
            <Typography variant="h1">
                Set your daily challenge preferences
            </Typography>
            <ContentBox>
                
                <FormQuestion>
                    <Typography variant="p" fontWeight="bold">
                        What category do you wanna challenge yourself in?
                    </Typography>
                    <RadioButtons
                        options={categoryOptions}
                        name="category"
                        value={category}
                        onChange={(value) => setCategory(value)}
                    />
                </FormQuestion>

                <FormQuestion>
                    <Typography variant="p" fontWeight="bold">
                        How long period for challenges?
                    </Typography>
                    <RadioButtons
                        options={timeOptions}
                        name="time"
                        value={time}
                        onChange={(value) => setTime(value)}
                    />
                </FormQuestion>

                <FormQuestion>
                    <Typography variant="p" fontWeight="bold">
                        How many challenges per week?
                    </Typography>
                    <SliderCount
                        label="Days"
                        value={days}
                        min={1}
                        max={7}
                        step={1}
                        onChange={(value) => setDays(value)}
                    />
                    {/* <RadioButtons
                        options={countOption}
                        name="count"
                        value={count}
                        onChange={(value) => setCount(value)}
                    /> */}
                </FormQuestion>

                <FormQuestion>
                    <Typography variant="p" fontWeight="bold">
                        What is your goal with the challenges?
                    </Typography>
                    <RadioButtons
                        options={goalOptions}
                        name="goal"
                        value={goal}
                        onChange={(value) => setGoal(value)}
                    />
                </FormQuestion>

                <FormQuestion>
                    <Typography variant="p" fontWeight="bold">
                        When do you wanna start?
                    </Typography>
                    <ChalendarStart
                        label="Select your start date"
                        onDateChange={(date) => setStartDate(date)} // Update chosen date
                    />
                    {startDate && (
                        <p>
                            You selected:{" "}
                            <strong>{startDate.toLocaleDateString("en-US")}</strong>
                        </p>
                    )}
                </FormQuestion>

                <Button 
                    text="Start!"
                    backgroundColor="#E75757"
                    width="100%"
                    /* onClick={submitForm} */
                />
            </ContentBox>
        </section>
    );
};