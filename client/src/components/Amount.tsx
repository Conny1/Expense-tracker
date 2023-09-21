import styled from "styled-components";

const Container = styled.div`
  min-width: 150px;
  background-color: #646cff;
  display: flex;
  flex-direction: column;
  flex: 1;
  max-width: 300px;
  height: 70px;
  align-items: center;
  gap: 15px;
`;
const Text = styled.p`
  color: #fff;
  margin: unset;
  /* margin-top: 1px; */
`;

const Amount = () => {
  return (
    <Container>
      <Text>Today</Text>
      <Text>Ksh 1000</Text>
    </Container>
  );
};

export default Amount;
