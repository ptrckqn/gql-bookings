import React, { useEffect, useState, Fragment } from "react";
import styled from "styled-components";
import { format } from "date-fns";

const Container = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 20px;
  background: #2d2f34;
  min-width: 500px;
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
  background-color: ${props => (props.alt ? "#FF9393" : "#8EF3BA")};
  padding: 10px 15px;
  border-radius: 20px;
  color: #000;
  text-align: center;
  text-decoration: none;
`;

const Button = styled.button`
  border: none;
  background-color: ${props => (props.alt ? "#FF9393" : "#8EF3BA")};
  font-family: inherit;
  padding: 10px 15px;
  border-radius: 20px;
  margin: 0 7.5px;
`;

const Center = styled.div`
  text-align: center;
`;

const DayDetails = ({ day, setDay }) => {
  const [appointments, setAppoinments] = useState();

  useEffect(() => {
    getAppoinments(day);
  }, [day]);

  const getAppoinments = async day => {
    const res = await fetch("http://localhost:4000/graphql", {
      body: JSON.stringify({
        query: `query{ appointments(date: "${day}"){name email date}}`
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
        "Content-Type": "application/json"
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
          <Grid>
            {appointments.map(({ date, email, name }) => (
              <Fragment key={date}>
                <span>{format(parseInt(date), "h:mm aa")}</span>{" "}
                <span>{name}</span> <span>{email}</span>
                <A href={`mailto:${email}`}>Email</A>
                <Button
                  alt
                  name="cancelAppoinment"
                  onClick={() =>
                    queryApi(
                      `mutation{ cancelAppoinment(date: "${date}"){success message}}`
                    )
                  }
                >
                  Cancel
                </Button>
              </Fragment>
            ))}
          </Grid>
        ) : (
          <h3>No appointments booked</h3>
        )}
        <Center>
          <Button alt name="blockDay" onClick={handleClick}>
            Block All Times
          </Button>
          <Button alt name="cancelDay" onClick={handleClick}>
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
