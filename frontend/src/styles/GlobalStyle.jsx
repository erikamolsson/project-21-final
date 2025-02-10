import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  html {
    height: 100%;
    margin: 0;
  }

  body {
    max-width: 762px;
    height: 100%;
    margin: 0 auto;
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
