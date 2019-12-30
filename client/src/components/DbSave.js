import React, { useContext, useState } from "react";
import styled from "styled-components";
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
  margin: 20px auto 0;
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

const DbSave = () => {
  const [db, setDb] = useContext(DbContext);
  const [details, setDetails] = useState();

  const handleChange = e => {
    setDetails(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    setDb(details);
  };

  return (
    <Container>
      <Card>
        <h1>Connect Backend</h1>
        <form onSubmit={handleSubmit}>
          <Input
            name="dburl"
            type="text"
            placeholder="Backend API Endpoint"
            onChange={handleChange}
          />
          <Button>Save</Button>
        </form>
      </Card>
    </Container>
  );
};

export default DbSave;
