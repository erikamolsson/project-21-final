import { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { Typography } from "../../reusable/Typography/Typography";

// Styled components
const HeaderBox = styled.header`
    margin: 0;
    padding: 0;
`;

const NavBar = styled.nav`
  background-color: #F3EFE5;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 1rem;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;


const Hamburger = styled.div`
  cursor: pointer;
  display: flex;
  flex-direction: column;
  gap: 5px;

  span {
    display: block;
    width: 25px;
    height: 3px;
    background-color: #333;
    border-radius: 2px;
  }
`;

const Menu = styled.ul`
  list-style: none;
  background-color: #F3EFE5;
  padding: 1rem;
  position: fixed;
  top: 30px;
  right: ${({ isOpen }) => (isOpen ? "0" : "-100%")}; /* Slide in from the right */
  max-width: 200px; 
  width: 100%; 
  height: auto;
  border-radius: 0 0 5px 5px;
  transition: right 0.3s ease;
  overflow: hidden; 

  @media (min-width: 768px) {
    display: ${({ isOpen }) => (isOpen ? "block" : "none")}; /* Hide links on desktop */
    position: absolute;
    top: auto;
    left: auto;
    box-shadow: none;
    width: auto;
    margin: 0;
  }
`;

const MenuItem = styled.li`
  padding: 0.5rem 0;
  text-align: center;

  a {
    text-decoration: none;
    color: #333;
    font-size: 1rem;
    font-weight: bold;
    transition: color 0.3s ease;

    &:hover {
      color: #555;
    }
  }
`;

const Overlay = styled.div`
  display: ${({ isOpen }) => (isOpen ? "block" : "none")};
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);

  @media (min-width: 768px) {
    display: none;
  }
`;

// Component
export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <HeaderBox>
      <NavBar>
        <Typography variant="p">
        DailyChallenges
        </Typography>
        <Hamburger onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </Hamburger>
      </NavBar>
      <Overlay isOpen={isOpen} onClick={closeMenu}></Overlay>
        <Menu isOpen={isOpen}>
          <MenuItem>
            <Link to="/" onClick={closeMenu}>
              Home
            </Link>
          </MenuItem>
          <MenuItem>
            <Link to="/feed" onClick={closeMenu}>
              Feed
            </Link>
          </MenuItem>
          <MenuItem>
            <Link to="/challenges-form" onClick={closeMenu}>
              Challenges Form
            </Link>
          </MenuItem>
          <MenuItem>
            <Link to="/register" onClick={closeMenu}>
              Register
            </Link>
          </MenuItem>
          <MenuItem>
            <Link to="/user-start" onClick={closeMenu}>
              User Start
            </Link>
          </MenuItem>
          <MenuItem>
            <Link to="/profile" onClick={closeMenu}>
              Profile
            </Link>
          </MenuItem>
        </Menu>
    </HeaderBox>
  );
};
