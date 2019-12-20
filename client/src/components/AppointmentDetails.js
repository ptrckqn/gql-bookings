import React from "react";
import styled from "styled-components";
import { format } from "date-fns";

const Container = styled.div`
  display: grid;
  border-bottom: 1px solid #505050;
  align-items: center;
  padding: 15px 0;
`;

const Input = styled.input`
  display: none;
`;

const Primary = styled.div`
  display: grid;
  grid-template-columns: 1fr 2.5fr 40px;
`;

const Label = styled.label`
  color: #fff;
  cursor: pointer;
`;

const ExpandBtn = styled.label`
  display: block;
  cursor: pointer;
  height: 30px;
  width: 30px;
  position: relative;
  transition: all 0.3s;
  ${Input}:checked ~ ${Primary} & {
    transform: rotate(135deg);
  }
  &::before,
  &::after {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
  }
  &::before {
    height: 3px;
    width: 50%;
  }
  &:after {
    height: 50%;
    width: 3px;
  }
`;

const Content = styled.div`
  display: none;
  ${Input}:checked ~ & {
    display: flex;
    flex-direction: column;
    color: #afafaf;
  }
`;

const A = styled.a`
  color: inherit;
`;

const Cancel = styled.button`
  margin-top: 10px;
  cursor: pointer;
  align-self: center;
  color: inherit;
  background: transparent;
  border: 1px solid #afafaf;
  padding: 5px 10px;
  border-radius: 10px;
  &:focus,
  &:hover {
    background-color: #27292d;
  }
  &:focus {
    outline: none;
    color: #fff;
    border: 1px solid #fff;
  }
`;

const AppoinmentDetails = ({
  data: { name, email, phone, date, meeting, location },
  handleClick,
  count
}) => {
  return (
    <Container>
      <Input type="checkbox" id={count} />
      <Primary>
        <Label htmlFor={count}>{format(parseInt(date), "h:mm aa")}</Label>
        <Label htmlFor={count}>{name}</Label>
        <ExpandBtn htmlFor={count} />
      </Primary>
      <Content>
        <A href={`mailto:${email}`}>{email}</A>
        <A href={`tel:${phone}`}>{phone}</A>
        <span>{meeting}</span>
        <span>{location}</span>
        <Cancel onClick={() => handleClick(date)}>Cancel Appointment</Cancel>
      </Content>
    </Container>
  );
};

export default AppoinmentDetails;
