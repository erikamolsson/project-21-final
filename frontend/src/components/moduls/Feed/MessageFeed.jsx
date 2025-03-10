import { useState, useEffect } from "react";
import styled from "styled-components";
/* import PropTypes from "prop-types"; */
import { ContentBox } from "../../reusable/ContentBox/ContentBox";
import { Typography } from "../../reusable/Typography/Typography";

const PostContainer = styled.div`
  background-color: #fff;
  padding: 1rem;
  margin-bottom: 1rem;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;

const TimeAgoRow = styled.div`
    text-align: end;
`;

/* 
Will add this later!
const Image = styled.img`
  max-width: 100%;
  border-radius: 5px;
  margin: 0.5rem 0;
`; */

const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.8rem;
  margin: 1.5rem 0 1.5rem;
`;

const LikeButton = styled.button`
display: flex;
align-items: center;
background: none;
border: none;
cursor: pointer;
font-size: 0.9rem;
color: #555;

&:hover {
  color: #000;
}

svg {
  margin-right: 5px;
}
`;

const CommentSection = styled.div`
  margin-top: 10px;
  padding-top: 10px;
  border-top: 1px solid #ddd;
  display: flex;
  flex-direction: column;
`;

const CommentPost = styled.section`
    padding: 1rem;
`;

const CommentInput = styled.input`
  width: calc(100% - 20px);
  padding: 0.5rem;
  margin: 0.5rem 0 0.5rem;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const CommentButton = styled.button`
  background-color: #5cb85c;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  cursor: pointer;
  font-size: 0.9rem;
  width: 20%;

  &:hover {
    background-color: #008441;
  }
`;

const TimePosted = styled.span`
  font-size: 0.8rem;
  color: #888;
`;




export const MessageFeed = ({ refreshTrigger }) => {
    const [posts, setPosts] = useState([]);
    const [likedPosts, setLikedPosts] = useState({});
    const [commentInputs, setCommentInputs] = useState({});

    const API_FEED_URL = import.meta.env.VITE_API_URL_PROD;
    console.log("API URL:", `${API_FEED_URL}/posts`); // Debugging

    // Fetch all posts from the backen
    const fetchPosts = async () => {
      try {
        const response = await fetch(`${API_FEED_URL}/posts`);
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    // ✅ Fetch posts when component mounts
    useEffect(() => {
      fetchPosts();
    }, [refreshTrigger]);


    // Handle likes
    const handleLike = async (id) => {
      const alreadyLiked = likedPosts[id];

      try {
        await fetch(`${API_FEED_URL}/posts/${id}/like`, {
            method: alreadyLiked ? "DELETE" : "POST", 
            headers: { "Content-Type": "application/json" },
          });
    
          setLikedPosts((prev) => ({ ...prev, [id]: !alreadyLiked }));
          setPosts((prevFeed) =>
            prevFeed.map((post) =>
              post._id === id
                ? { ...post, likes: post.likes + (alreadyLiked ? -1 : 1) }
                : post
            )
          );
        } catch (error) {
          console.error("Error updating like:", error);
        }
      };

    // Handle comment input change
    const handleCommentChange = (postId, text) => {
      setCommentInputs((prev) => ({ ...prev, [postId]: text }));
    };
    
    // Submit comment
    const submitComment = async (postId) => {
      const text = commentInputs[postId];
      if (!text) {
        console.log("Comment text is empty");
        return;
      }
  

      try {
        const response = await fetch(`${API_FEED_URL}/posts/${postId}/comment`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text }),
        });

        console.log("API-URL2: ", text);

        if (!response.ok) {
          throw new Error("Failed to add comment");
        }

        const updatedPost = await response.json();
        console.log("Comment added successfully:", updatedPost);

        // Update frontend state to show the new comment immediately
        setPosts((prevPosts) =>
          prevPosts.map((post) =>
            post._id === postId ? { ...post, comments: updatedPost.comments } : post
          )
        );

        // Fetch updated posts from backend
        await fetchPosts(); 

        // Clear input field
        setCommentInputs((prev) => ({ ...prev, [postId]: "" }));
      } catch (error) {
        console.error("Error adding comment:", error);
      }
    };

    // How long ago a message was posted
    const formatTime = (timestamp) => {
      const now = new Date();
      const postDate = new Date(timestamp);
      const secondsAgo = Math.floor((now - postDate) / 1000);
    
      if (secondsAgo < 60) return `${secondsAgo} seconds ago`;
      const minutesAgo = Math.floor(secondsAgo / 60);
      if (minutesAgo < 60) return `${minutesAgo} minutes ago`;
      const hoursAgo = Math.floor(minutesAgo / 60);
      if (hoursAgo < 24) return `${hoursAgo} hours ago`;
      const daysAgo = Math.floor(hoursAgo / 24);
      return `${daysAgo} days ago`;
    };

    return (
        <ContentBox margin="30px 0">
            {posts.map((post) => (
            <PostContainer key={post._id}>
                <TimeAgoRow>
                  <TimePosted>{formatTime(post.timestamp || post.createdAt)}</TimePosted>
                </TimeAgoRow>
                <Typography variant="p">{post.message}</Typography>
                <InfoRow>
                    <LikeButton onClick={() => handleLike(post._id)}>
                        👍 {post.likes} likes
                    </LikeButton>
                </InfoRow>

                {/* Comment Section */}
                <CommentSection>
                  {post.comments && post.comments.length > 0 && (
                    <CommentPost>
                    {post.comments.map((comment, index) => (
                      <Typography key={index} variant="p" borderBottom="1px solid #ccc" marginAll="1rem 0 1.5rem">
                        {comment.text}
                      </Typography>
                    ))}
                    </CommentPost>
                  )}
                  <CommentInput
                    type="text"
                    placeholder="Write a comment..."
                    value={commentInputs[post._id] || ""}
                    onChange={(e) => handleCommentChange(post._id, e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && submitComment(post._id)}
                  />
                  <CommentButton onClick={() => submitComment(post._id)}>
                    Submit
                  </CommentButton>
                </CommentSection>
            </PostContainer>
            ))}
        </ContentBox>
    );
};


/* MessageFeed.propTypes = {
    posts: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        content: PropTypes.string.isRequired,
        image: PropTypes.string,
        likes: PropTypes.number.isRequired,
        timestamp: PropTypes.number.isRequired,
      })
    ),
  }; */
