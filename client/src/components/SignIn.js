import React, { useContext, useState } from "react";
import styled from "styled-components";
import { UserContext } from "../context/userContext";
import { DbContext } from "../context/dbContext";

const Container = styled.div`
  height: calc(100vh - 74px);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Card = styled.div`
  padding: 20px;
  background: #27292d;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  text-align: center;
  border-radius: 10px;
  width: 100%;
  max-width: 500px;
  margin: 30px;
`;

const Input = styled.input`
  display: block;
  background-color: #2d2f34;
  border: none;
  font-size: 16px;
  padding: 12px 15px;
  margin: 8px 0;
  width: 100%;
  border-radius: 10px;
  color: #fff;
  margin: 20px auto;
  &:focus,
  &:hover {
    outline: none;
    background-color: #383b40;
  }
`;

const Button = styled.button`
  margin: 20px auto;
  border-radius: 20px;
  border: 1px solid #2d2f34;
  background-color: #2d2f34;
  color: #ffffff;
  font-size: 16px;
  font-weight: bold;
  padding: 12px 45px;
  letter-spacing: 1px;
  text-transform: uppercase;
  transition: transform 80ms ease-in;
  cursor: pointer;
  &:active {
    transform: scale(0.9);
  }
  &:focus {
    outline: none;
  }
`;

const AltButton = styled.button`
  cursor: pointer;
  color: inherit;
  text-decoration: underline;
  border: none;
  background-color: transparent;
`;

const SignIn = () => {
  const [user, setUser] = useContext(UserContext);
  const [db, setDb] = useContext(DbContext);
  const [loginDetails, setLoginDetails] = useState({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState();

  const handleChange = e => {
    setLoginDetails({ ...loginDetails, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);

    const res = await fetch(db, {
      body: JSON.stringify({
        query: `mutation{ loginUser(email: "${loginDetails.email}", password: "${loginDetails.password}"){success message token}}`
      }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      method: "POST"
    });
    const json = await res.json();
    if (!json.data.loginUser.success) {
      setMessage("Incorrect email or password");
      setLoading(false);
    } else {
      setUser(json.data.loginUser.token);
    }
  };

  return (
    <Container>
      <Card>
        <h1>Sign In</h1>
        <p style={{ color: "#f2777a" }}>{message}</p>
        <form onSubmit={handleSubmit}>
          <Input
            name="email"
            type="text"
            placeholder="Email"
            onChange={handleChange}
            disabled={loading}
          />
          <Input
            name="password"
            type="password"
            placeholder="Password"
            onChange={handleChange}
            disabled={loading}
          />
          <Button disabled={loading}>
            {loading ? "Signing In..." : "Sign In"}
          </Button>
        </form>
        <AltButton onClick={() => setDb(null)}>Change database</AltButton>
      </Card>
    </Container>
  );
};

export default SignIn;
