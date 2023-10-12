import styled from "styled-components";
import { mobile } from "./utils/Responsive";

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
  ${mobile({ width: "90%" })};
`;
const Text = styled.p`
  color: #fff;
  margin: unset;
  /* margin-top: 1px; */
`;

type Props = {
  text: string;
  total: number;
};

const Amount = ({ text, total }: Props) => {
  return (
    <Container>
      <Text>{text}</Text>
      <Text>{total}</Text>
    </Container>
  );
};

export default Amount;
