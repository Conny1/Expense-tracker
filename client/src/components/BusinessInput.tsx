import styled from "styled-components";
// import React, { useState } from "react";

import Select from "react-select";

const colourOptions = [
  { value: "ocean", label: "Ocean" },
  { value: "blue", label: "Blue" },
  { value: "purple", label: "Purple" },
  { value: "red", label: "Red" },
  { value: "orange", label: "Orange" },
  { value: "yellow", label: "Yellow" },
  { value: "green", label: "Green" },
  { value: "forest", label: "Forest" },
  { value: "slate", label: "Slate" },
  { value: "silver", label: "Silver" },
];

const Container = styled.div`
  outline: 1px solid gainsboro;
  padding: 5px;
  width: 50%;

  margin-top: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-top: 30px;
`;
const Form = styled.form`
  /* flex: 1; */
  display: flex;
  width: 100%;
  flex-direction: column;
  height: 300px;
  justify-content: space-between;
`;
const Item = styled.div`
  width: 100%;
`;
const Input = styled.input`
  width: 98%;
  height: 40px;
  font-size: 15px;
`;
const Btn = styled.button`
  height: 40px;
  max-width: 100px;
  align-self: center;
`;

const BusinessInput = () => {
  return (
    <Container>
      <h3>Enter income and Expenses</h3>
      <Form>
        <Item>
          <Select
            className="basic-single"
            classNamePrefix="select"
            name="business"
            options={colourOptions}
          />
        </Item>
        <Item>
          <Input type="number" placeholder="Income" required />
        </Item>

        <Item>
          <Input type="number" placeholder="Expense" required />
        </Item>

        <Btn type="submit"> Add</Btn>
      </Form>
    </Container>
  );
};

export default BusinessInput;
