import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@200;300;400;600;700;900&display=swap');

  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
  }

  html, body, #root {
    min-height: 100vh;
  }

  body {
    background: #fff;
    text-rendering: optimizelegibility;
    -webkit-font-smoothing: antialiased !important;
  }

  body, input, select, button {
    font-family: 'Cairo', sans-serif;
    font-size: 16px;
    color: #605b6d;
  }

  input, select {
    background: transparent;
    width: 100%;
    margin-bottom: 20px;
    border: 1.5px solid #ddd;
    border-radius: 8px;
    height: 42px;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    padding: 0 15px !important;

    &:focus {
      border: 1.5px solid #5e076d;
    }
  }

  a {
    text-decoration: none;
  }
`; 