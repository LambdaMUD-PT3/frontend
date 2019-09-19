import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
    *, *:before, *:after {
        box-sizing: border-box;
    }

    html {
        font-size: 62.5%;
    }

    body {
        background: #A9A9A9;
        font-family: 'Roboto Mono', monospace;
    }

    #root {
        width: 95%;
        max-width: 1000px;
        margin: 0 auto;
    }
`;

export default GlobalStyle;
