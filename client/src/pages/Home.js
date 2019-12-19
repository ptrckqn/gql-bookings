import React, { useContext } from "react";
import UserContext from "../context/userContext";
import Calendar from "../components/Calendar";
import SignIn from "../components/SignIn";

const Home = () => {
  const user = useContext(UserContext);

  if (!user.email || !user.token) {
    return <SignIn />;
  }
  return <Calendar />;
};

export default Home;
