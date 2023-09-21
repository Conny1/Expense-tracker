import Nav from "../components/Nav";
import { styled } from "styled-components";
const Container = styled.div`
  outline: 1px solid yellow;
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
`;
const Analysis = () => {
  return (
    <Container>
      <Nav />
    </Container>
  );
};

export default Analysis;
