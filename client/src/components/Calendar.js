import React, { useState, useEffect } from "react";
import {
  format,
  subMonths,
  addMonths,
  addDays,
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  isWeekend,
  isSameMonth
} from "date-fns";
import DayDetails from "./DayDetails";

import styled from "styled-components";

const Container = styled.div`
  background: #27292d;
  margin: 30px;
  border-radius: 5px;
  padding: 20px;
  @media only screen and (max-width: 29.5em) {
    margin: 30px 10px;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 34px;
  @media only screen and (max-width: 29.5em) {
    font-size: 26px;
  }
`;

const Chevron = styled.div`
  position: relative;
  height: 20px;
  width: 20px;
  cursor: pointer;
  padding: 0 50px;
  &::before,
  &::after {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    height: 2px;
    width: 10px;
    background-color: #afafaf;
    transform-origin: ${props => props.direction};
  }

  &::before {
    transform: translate(-50%, -50%) rotate(45deg);
  }
  &::after {
    transform: translate(-50%, -50%) rotate(-45deg);
  }
  @media only screen and (max-width: 29.5em) {
    padding: 0 20px;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
`;

const Days = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  margin: 30px 0;
  span {
    width: 100%;
    text-align: center;
    padding: 20px 0;
  }
  @media only screen and (max-width: 29.5em) {
    font-size: 16px;
  }
`;

const Day = styled.div`
  width: 100%;
  height: 80px;
  border: 1px solid #505050;
  color: ${props => (props.alt ? "#505050" : "#fff")};
  padding: 10px;
  cursor: pointer;
  &:hover {
    background: rgba(255, 255, 255, 0.08);
  }
  @media only screen and (max-width: 29.5em) {
    border: none;
    text-align: center;
    padding: 20px 10px;
  }
`;

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState();
  const [cells, setCells] = useState([]);
  const [day, setDay] = useState();

  useEffect(() => {
    setCurrentDate(new Date());
  }, []);

  useEffect(() => {
    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);
    let day = startDate;

    setCells([]);

    while (day <= endDate) {
      const tempDay = day;

      setCells(prevState => [...prevState, tempDay]);

      day = addDays(day, 1);
    }
  }, [currentDate]);

  const nextMonth = () => {
    setCurrentDate(addMonths(currentDate, 1));
  };
  const prevMonth = () => {
    setCurrentDate(subMonths(currentDate, 1));
  };

  const handleClick = async day => {
    setDay(day);
  };

  const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  return (
    <>
      <Container>
        <Header className="header row flex-middle">
          <Chevron direction="left" onClick={prevMonth} />
          {currentDate && <h6>{format(currentDate, "MMMM yyyy")}</h6>}
          <Chevron direction="right" onClick={nextMonth} />
        </Header>
        <Days>
          {days.map(day => (
            <span key={day}>{day}</span>
          ))}
        </Days>
        <Grid>
          {cells &&
            cells.map(day => (
              <Day
                alt={isWeekend(day) || !isSameMonth(day, currentDate)}
                onClick={() => handleClick(day)}
                key={day}
              >
                <span>{format(day, "d")}</span>
              </Day>
            ))}
        </Grid>
      </Container>
      {day && <DayDetails day={day} setDay={setDay} />}
    </>
  );
};

export default Calendar;
