import styled from "styled-components";
import { Link } from "react-router-dom";
const Container = styled.div`
  outline: 1px solid gainsboro;
  padding: 5px;
  width: 100%;
  min-height: 100vh;
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
  width: 400px;
  flex-direction: column;
  height: 300px;
  justify-content: space-evenly;
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

const Login = () => {
  return (
    <Container>
      <h3>Enter the required credentials</h3>
      <Form>
        <Item>
          <Input type="text" placeholder="Email" required />
        </Item>
        <Item>
          <Input type="Password" placeholder="Password" required />
        </Item>

        <Btn type="submit"> Login</Btn>
        <Link to="/forgot">Forgot password ?</Link>
      </Form>
    </Container>
  );
};

export default Login;
