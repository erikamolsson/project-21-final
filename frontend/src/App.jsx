import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ChallengeFeed } from "./components/moduls/Feed/ChallengeFeed";
import { HomepageAll } from "./pages/HomepageAll";
import { HomepageUser } from "./pages/HomepageUser";
import { ProfileUser } from "./pages/ProfileUser";
import { ChallengesForm } from "./pages/ChallengesForm";
import { Register } from "./pages/Register";



export const App = () => {

  return (

    <Router>
      <Routes>
        <Route path="/" element={<HomepageAll />} />
        <Route path="/feed" element={<ChallengeFeed />} />
        <Route path="/challenges-form" element={<ChallengesForm />} />
        <Route path="/register" element={<Register />} />
        <Route path="/user-start" element={<HomepageUser />} />
        <Route path="/profile" element={<ProfileUser />} />
      </Routes>
    </Router>
    
  );
};
