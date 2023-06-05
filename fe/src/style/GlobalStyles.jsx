import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle` 
    a {
      text-decoration: none;
      color: inherit;
    }

    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      font-family: 'pretendard', sans-serif;
    }

    button {
      border: none;
      background: none;
      padding: 0;
      cursor: pointer;
      color: inherit;
    }

    button:disabled{
      cursor: not-allowed;
    }

    input {
      color: inherit;
      background-color: inherit;
      border: none;
    }

    textarea{
      border: none;
      background-color: inherit;
      font-family: inherit;
      resize: none;
    }

    input:focus, textarea:focus {
      outline:none;
    }
    
    li{
      list-style: none;
      color: inherit;
    }

    h1{
      font-size: inherit;
      font-weight: inherit;
    }
`;

export default GlobalStyles;
