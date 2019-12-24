import React, { useContext } from "react";
import { UserContext } from "../context/userContext";
import { DbContext } from "../context/dbContext";
import Calendar from "../components/Calendar";
import SignIn from "../components/SignIn";
import DbSave from "../components/DbSave";

const Home = () => {
  const [user] = useContext(UserContext);
  const [db] = useContext(DbContext);
  if (!db || db == "null") return <DbSave />;
  if (!user) return <SignIn />;
  return <Calendar />;
};

export default Home;
