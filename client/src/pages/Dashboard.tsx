import Addbusiness from "../components/Addbusiness";
import Amount from "../components/Amount";
import BusinessInput from "../components/BusinessInput";
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
const Values = styled.div``;
const ProfitLoss = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
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
          <h3>Profits made </h3>
          <ProfitLoss>
            <Amount />
            <Amount />
            <Amount />
            <Amount />
          </ProfitLoss>
          <h3>Loss incured </h3>
          <ProfitLoss>
            <Amount />
            <Amount />
            <Amount />
            <Amount />
          </ProfitLoss>
        </Values>
      </BodyContainer>
    </Container>
  );
};

export default Dashboard;
