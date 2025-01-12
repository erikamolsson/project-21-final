import React from "react";
import { ChallengeFeed } from "./components/moduls/Feed/ChallengeFeed";
import { HomepageAll } from "./pages/HomepageAll";
import { HomepageUser } from "./pages/HomepageUser";



export const App = () => {

  return (
    <>
      <HomepageAll />
      <HomepageUser />
      <ChallengeFeed />
    </>
  );
};
