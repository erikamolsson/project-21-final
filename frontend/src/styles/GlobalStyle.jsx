import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  html, body {
    height: 100%;
    margin: 0 0.1rem;
  }

  #root {
    display: flex;
    flex-direction: column;
    min-height: 100vh; /* Makes the page at least full height */
  }

  main {
    flex: 1; /* Pushes footer down */
  }
`;
