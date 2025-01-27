import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ChallengeFeed } from "./components/moduls/Feed/ChallengeFeed";
import { HomepageAll } from "./pages/HomepageAll";
import { HomepageUser } from "./pages/HomepageUser";
import { ProfileUser } from "./pages/ProfileUser";
import { ProfileIDPage } from "./pages/ProfileID";
import { ChallengesForm } from "./pages/ChallengesForm";
import { Register } from "./pages/Register";
import { UserProvider } from "./context/UserContext";
import { Header } from "./components/moduls/Header/Header";



export const App = () => {

  return (
    <>
      <UserProvider>
        <BrowserRouter>
        <Header />
          <Routes>
            <Route path="/" element={<HomepageAll />} />
            <Route path="/feed" element={<ChallengeFeed />} />
            <Route path="/challenges-form" element={<ChallengesForm />} />
            <Route path="/register" element={<Register />} />
            <Route path="/user-start" element={<HomepageUser />} />
            <Route path="/profile" element={<ProfileUser />} />
            <Route path="/users/:id" element={<ProfileIDPage />} />
          </Routes>
        </BrowserRouter>
      </UserProvider>   
    </>
  );
};
