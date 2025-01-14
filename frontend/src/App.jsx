import React from "react";
import { ChallengeFeed } from "./components/moduls/Feed/ChallengeFeed";
import { HomepageAll } from "./pages/HomepageAll";
import { HomepageUser } from "./pages/HomepageUser";
import { ProfileUser } from "./pages/ProfileUser";
import { ChallengesForm } from "./pages/ChallengesForm";



export const App = () => {

  return (
    <>
      <ChallengesForm />
      <ProfileUser />
      <HomepageAll />
      <HomepageUser />
      <ChallengeFeed />
    </>
  );
};
