import { useState } from "react";
import { MessageFeed } from "./MessageFeed";
import { PostNewMessage } from "./PostNewMessage";


export const ChallengeFeed = () => {
    const [challengeFeed, setChallengeFeed] = useState([]);
    const [refreshTrigger, setRefreshTrigger] = useState(false);

    //Callback for new thought
    const addPost = (newPost) => {
        setChallengeFeed((prevFeed) => [newPost, ...prevFeed]);
        setRefreshTrigger((prev) => !prev);
    };

    return (
        <section>
            <PostNewMessage onNewPost={addPost} />
            <MessageFeed 
                challengeFeed={challengeFeed} 
                setChallengeFeed={setChallengeFeed}
                refreshTrigger={refreshTrigger} 
            />
        </section>
    );
};