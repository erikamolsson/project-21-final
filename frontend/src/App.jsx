import React from "react";
import { ChallengeFeed } from "./components/moduls/Feed/ChallengeFeed";
import { HomepageAll } from "./pages/HomepageAll";
import { HomepageUser } from "./pages/HomepageUser";
import { ProfileUser } from "./pages/ProfileUser";



export const App = () => {

  return (
    <>
      <ProfileUser />
      <HomepageAll />
      <HomepageUser />
      <ChallengeFeed />
    </>
  );
};
