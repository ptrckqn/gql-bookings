import React, { useContext, useEffect, useState, Fragment } from "react";
import styled from "styled-components";
import { format } from "date-fns";
import { UserContext } from "../context/userContext";
import AppointmentDetails from "./AppointmentDetails";

const Container = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 20px;
  background: #2d2f34;
  border-radius: 10px;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  @media only screen and (max-width: 29.5em) {
    width: calc(100% - 20px);
  }
  max-height: 90vh;
  overflow-y: scroll;
  overflow-y: -moz-scrollbars-none;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    width: 0 !important;
  }
`;

const CloseBtn = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  height: 20px;
  width: 20px;
  border: none;
  background: transparent;
  cursor: pointer;
  &::before,
  &::after {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    height: 2px;
    width: 100%;
    background-color: #fff;
  }
  &::before {
    transform: translate(-50%, -50%) rotate(45deg);
  }
  &::after {
    transform: translate(-50%, -50%) rotate(-45deg);
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr) 100px 100px;
  grid-gap: 15px;
  padding: 20px 0;
`;
const A = styled.a`
  background-color: #383b40;
  padding: 10px 15px;
  border-radius: 20px;
  color: inherit;
  text-align: center;
  text-decoration: none;
  width: 100%;
`;

const Button = styled.button`
  border: none;
  background-color: #383b40;
  color: inherit;
  font-family: inherit;
  padding: 10px 15px;
  border-radius: 20px;
  margin: 7.5px;
  cursor: pointer;
`;

const Center = styled.div`
  text-align: center;
`;

const DayDetails = ({ day, setDay }) => {
  const [user] = useContext(UserContext);
  const [appointments, setAppoinments] = useState();

  useEffect(() => {
    //Creating an event listener which will call the function escFunction anytime a key is pressed.
    document.addEventListener("keydown", e =>
      e.keyCode === 27 ? setDay() : null
    );
  });

  useEffect(() => {
    setAppoinments();
    getAppoinments(day);
  }, [day]);

  //        authorization:"eyJhbGciOiJIUzI1NiJ9.UEFUUklDS0BsZXNzdGhhbjMuY2E.HpyViZsa73-bVyjYl3lIUJrULQkBg0fhVHsRB1tvIkQ"

  const getAppoinments = async day => {
    const res = await fetch("http://localhost:4000/graphql", {
      body: JSON.stringify({
        query: `query{ appointments(date: "${day}"){name email phone date meeting location}}`
      }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      method: "POST"
    });
    const json = await res.json();
    setAppoinments(json.data.appointments);
  };

  const handleClick = e => {
    switch (e.target.name) {
      case "blockDay":
        return queryApi(`mutation{ bookDay(date: "${day}"){success message}}`);
      case "cancelDay":
        return queryApi(
          `mutation{ cancelDay(date: "${day}"){success message}}`
        );
      case "close":
        return setDay();
      default:
        return;
    }
  };

  const queryApi = async query => {
    const res = await fetch("http://localhost:4000/graphql", {
      body: JSON.stringify({
        query: query
      }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        authorization: `Bearer ${user}`
      },
      method: "POST"
    });
    const json = await res.json();
    const tempDay = day;
    setDay();
    setDay(tempDay);
  };

  if (day) {
    return (
      <Container>
        <CloseBtn name="close" onClick={handleClick} />
        <h2>{format(day, "MMMM do, yyyy")}</h2>
        {appointments && appointments.length > 0 ? (
          appointments.map((data, count) => (
            <AppointmentDetails data={data} key={count} count={count} />
          ))
        ) : (
          <h3>No appointments booked</h3>
        )}
        <Center>
          <Button name="blockDay" onClick={handleClick}>
            Block All Times
          </Button>
          <Button name="cancelDay" onClick={handleClick}>
            Cancel All Appointments
          </Button>
        </Center>
      </Container>
    );
  } else {
    return null;
  }
};

export default DayDetails;

// `mutation{ cancelAppoinment(date: "${date}"){success message}}`
