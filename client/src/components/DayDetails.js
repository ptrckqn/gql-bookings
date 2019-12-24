import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { format, setHours, addHours, startOfHour, isSameHour } from "date-fns";
import { UserContext } from "../context/userContext";
import AppointmentDetails from "./AppointmentDetails";
import Popover from "./Popover";

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

const Option = styled.button`
  display: block;
  border: none;
  background-color: transparent;
  color: inherit;
  cursor: pointer;
  width: 100%;
  text-align: left;
  padding: 5px 10px;
  &:hover {
    background-color: #4c4f54;
  }
`;

const Button = styled.button`
  margin: 10px 10px 0;
  cursor: pointer;
  align-self: center;
  color: inherit;
  background: transparent;
  border: 1px solid #fff;
  padding: 5px 10px;
  border-radius: 10px;
  &:focus,
  &:hover {
    background-color: #27292d;
  }
  &:focus {
    outline: none;
    color: #afafaf;
    border: 1px solid #afafaf;
  }
`;

const Center = styled.div`
  text-align: center;
`;

const DayDetails = ({ day, setDay }) => {
  const [user] = useContext(UserContext);
  const [appointments, setAppoinments] = useState();
  const [coordinates, setCoordinates] = useState([]);
  const [availableTimes, setAvailableTimes] = useState([]);

  useEffect(() => {
    //Creating an event listener which will call the function escFunction anytime a key is pressed.
    document.addEventListener("keydown", e =>
      e.keyCode === 27 ? setDay() : null
    );
  }, []);

  useEffect(() => {
    getAppoinments(day);
  }, [day]);

  //        authorization:"eyJhbGciOiJIUzI1NiJ9.UEFUUklDS0BsZXNzdGhhbjMuY2E.HpyViZsa73-bVyjYl3lIUJrULQkBg0fhVHsRB1tvIkQ"

  const getAppoinments = async day => {
    setAvailableTimes([]);
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

    let hour = startOfHour(setHours(day, 9));
    const endHour = startOfHour(setHours(day, 17));

    while (hour < endHour) {
      if (
        !json.data.appointments.some(e =>
          isSameHour(new Date(parseInt(e.date)), hour)
        )
      ) {
        setAvailableTimes(prevState => [...prevState, hour]);
      }
      hour = addHours(hour, 1);
    }
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
      case "openDropdown":
        setCoordinates([
          e.target.getBoundingClientRect().x,
          e.target.getBoundingClientRect().y
        ]);
        return;
      default:
        return;
    }
  };

  const cancelAppointment = date => {
    queryApi(`mutation{ cancelAppoinment(date: "${date}"){success message}}`);
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
      <>
        <Container>
          <CloseBtn name="close" onClick={handleClick} />
          <h2>{format(day, "MMMM do, yyyy")}</h2>
          {appointments && appointments.length > 0 ? (
            appointments.map((data, count) => (
              <AppointmentDetails
                data={data}
                key={count}
                count={count}
                handleClick={cancelAppointment}
              />
            ))
          ) : (
            <h3>No appointments booked</h3>
          )}
          <Center>
            <Button name="openDropdown" id="blockButton" onClick={handleClick}>
              Block Times
            </Button>
            <Button name="cancelDay" onClick={handleClick}>
              Cancel All Appointments
            </Button>
          </Center>
        </Container>
        {coordinates.length > 0 && (
          <Popover coordinates={coordinates} setCoordinates={setCoordinates}>
            <Option name="blockDay" onClick={handleClick}>
              All
            </Option>
            {availableTimes.length > 0 &&
              availableTimes.map((time, count) => (
                <Option
                  key={count}
                  onClick={() =>
                    queryApi(
                      `mutation {bookAppoinment(name: "UNAVAILABLE", date: "${time}"){success message}}`
                    )
                  }
                >
                  {format(time, "h:mm a")}
                </Option>
              ))}
          </Popover>
        )}
      </>
    );
  } else {
    return null;
  }
};

export default DayDetails;
