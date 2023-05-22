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
    }

    button {
      border: none;
      background: none;
      padding: 0;
      cursor: pointer;
      color: inherit;
    }

    input {
      color: inherit;
      background-color: inherit;
    }

    input:focus {
      outline:none;
    }
    
    li{
      list-style: none;
      color: inherit;
    }
`;

export default GlobalStyles;
