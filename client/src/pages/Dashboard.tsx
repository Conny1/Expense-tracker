import Addbusiness from "../components/Addbusiness";

import BusinessInput from "../components/BusinessInput";
import BusinessTable from "../components/BusinessTable";
import Nav from "../components/Nav";
import { styled } from "styled-components";
const Container = styled.div`
  outline: 1px solid yellow;
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  min-height: 100vh;
  margin-bottom: 30px;
`;
const Section = styled.div`
  width: 100%;
  /* outline: 1px solid red; */
  display: flex;

  background-color: #646cff;
  padding-top: 2px;
`;
// const Btn = styled.button`
//   height: 40px;
// `;

const BodyContainer = styled.div`
  width: 90%;
  display: flex;
  gap: 10px;
`;
const Values = styled.div`
  flex: 1;
`;

const Dashboard = () => {
  return (
    <Container>
      <Nav />
      <Section></Section>
      <Addbusiness />
      <BodyContainer>
        <BusinessInput />
        <Values>
          <h3>Profits $ loss </h3>
          <BusinessTable />
        </Values>
      </BodyContainer>
    </Container>
  );
};

export default Dashboard;
