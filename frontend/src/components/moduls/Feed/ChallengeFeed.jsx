import { MessageFeed } from "./MessageFeed";
import { PostNewMessage } from "./PostNewMessage";


export const ChallengeFeed = () => {
    return (
        <section>
            <PostNewMessage />
            <MessageFeed />
        </section>
    );
};