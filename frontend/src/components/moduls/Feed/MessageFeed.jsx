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

const Image = styled.img`
  max-width: 100%;
  border-radius: 5px;
  margin: 0.5rem 0;
`;

const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.8rem;
  margin-top: 0.5rem;
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

const CommentButton = styled.button`
  background-color: #5cb85c;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  cursor: pointer;
  font-size: 0.9rem;

  &:hover {
    background-color: #4cae4c;
  }
`;

const TimePosted = styled.span`
  font-size: 0.8rem;
  color: #888;
`;

// Mockade API-data
const fetchPosts = async () => {
    return [
      {
        id: 1,
        title: "TITLE",
        content:
          "How did you manage this challenge? Can we share our stories and compare. Would be so fun to see how others approached it! :)",
        image: null,
        likes: 10,
        timestamp: new Date().getTime() - 3600 * 1000, 
      },
      {
        id: 2,
        title: "TITLE",
        content: "How did you manage this challenge? Can we share our stories and compare.",
        image: "https://via.placeholder.com/150", 
        likes: 10,
        timestamp: new Date().getTime() - 3600 * 24 * 1000 * 3, 
      },
      {
        id: 3,
        title: "TITLE",
        content:
          "How did you manage this challenge? Can we share our stories and compare. Would be so fun to see how others approached it! :)",
        image: null,
        likes: 10,
        timestamp: new Date().getTime() - 3600 * 24 * 1000 * 6,
      },
    ];
  };

export const MessageFeed = () => {
    const [posts, setPosts] = useState([]);

    
    useEffect(() => {
        // Hämtar inlägg (mockad API-anrop)
        const getPosts = async () => {
          const data = await fetchPosts();
          setPosts(data);
        };
        getPosts();
      }, []);

    // Handle likes
    const handleLike = (id) => {
        setPosts((prevPosts) =>
          prevPosts.map((post) =>
            post.id === id ? { ...post, likes: post.likes + 1 } : post
          )
        );
      };

    // How long ago a message was posted
    const formatTime = (timestamp) => {
        const secondsAgo = Math.floor((new Date().getTime() - timestamp) / 1000);
        if (secondsAgo < 60) return `${secondsAgo} seconds ago`;
        if (secondsAgo < 3600) return `${Math.floor(secondsAgo / 60)} minutes ago`;
        if (secondsAgo < 86400) return `${Math.floor(secondsAgo / 3600)} hours ago`;
        return `${Math.floor(secondsAgo / 86400)} days ago`;
    };

    return (
        <ContentBox
            margin="20px"
        >
            {posts.map((post) => (
            <PostContainer key={post.id}>
                <TimeAgoRow>
                    <TimePosted>{formatTime(post.timestamp)}</TimePosted>
                </TimeAgoRow>
                <Typography variant="h2">{post.title}</Typography>
                <Typography variant="p">{post.content}</Typography>
                {post.image && <Image src={post.image} alt="Post visual" />}
                <InfoRow>
                    <LikeButton onClick={() => handleLike(post.id)}>
                        👍 {post.likes} likes
                    </LikeButton>
                    <CommentButton>Comment</CommentButton>
                </InfoRow>
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
