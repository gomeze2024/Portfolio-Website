import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  :root {
    font-family:  serif;
    line-height: 1.5;
    font-weight: 400;
    width: 100vw;

    color-scheme: light dark;
    color: rgba(255, 255, 255, 0.87);
    background-color: #242424;

    font-synthesis: none;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  a {
    font-weight: 500;
    color: inherit;
    text-decoration: inherit;
    text-decoration: inherit;
  }

  body {
    margin: 0;
    display: flex;
    place-items: center;
    min-width: 320px;
    min-height: 100vh;
    background-color: #f7f7f0;
  }

  h1 {
    font-size: 3.2em;
    line-height: 1.1;
  }
`;
