import React from "react";
import { PostNewMessage } from "./components/moduls/Feed/PostNewMessage";
import { MessageFeed } from "./components/moduls/Feed/MessageFeed";



export const App = () => {

  return (
    <>
      <PostNewMessage />
      <MessageFeed />
    </>
  );
};
