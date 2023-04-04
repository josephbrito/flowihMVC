import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
    * {
        margin:0;
        padding:0;
        box-sizing: border-box;
    }

    a {
        color: #ffff;
        text-decoration:none;
    }

    html, body, #root {
        height:100%;
    }

    body {
        font-family: 'Roboto', sans-serif;
    }
`;
