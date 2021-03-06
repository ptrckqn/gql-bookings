import React from "react";
import { Switch, Route } from "react-router-dom";
import { createGlobalStyle } from "styled-components";
import { UserContextProvider } from "./context/userContext";
import { DbContextProvider } from "./context/dbContext";
import Nav from "./components/Nav";
import Home from "./pages/Home";

const GlobalStyles = createGlobalStyle`
*, *::after, *::before{
      margin: 0;
      padding: 0;
      box-sizing: inherit;
  }
  body{
      font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif;
      color: #efefef;
      background-color: #1F2023;
      font-size: 18px;
      box-sizing: border-box;
  }
  button{
    font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif;
    font-size: 18px;
  }
`;

const App = () => {
  return (
    <DbContextProvider>
      <UserContextProvider>
        <GlobalStyles />
        <Nav />
        <Switch>
          <Route path="/" exact component={Home} />
        </Switch>
      </UserContextProvider>
    </DbContextProvider>
  );
};

export default App;
