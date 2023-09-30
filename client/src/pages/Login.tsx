import { useState, useEffect } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { useLoginAccountMutation } from "../components/utils/reduxtollkitquery";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Container = styled.div`
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
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const navigation = useNavigate();

  const [loginAccount, { data, isLoading, isSuccess, error }] =
    useLoginAccountMutation();

  const login = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (email === "" || password === "") {
      return toast("Enter all valid credentials.");
    }
    loginAccount({ email, password });
  };

  useEffect(() => {
    if (isLoading) toast("Loading...");
    if (isSuccess) {
      toast("Login sucessful");
      localStorage.setItem("user", JSON.stringify(data));
      navigation("/");
    }
    if (error) {
      if ("status" in error) {
        if (error.status === 404) {
          toast("account with that email does not exist");
        }

        if (error.status === 401) {
          toast("Invalid email or password");
        }

        if (error.status === 500) {
          toast("network Error. Try again");
        }
      }
    }
  }, [isLoading, isSuccess, navigation, data, error]);

  return (
    <Container>
      <ToastContainer />
      <h3>Enter the required credentials</h3>
      <Form onSubmit={login}>
        <Item>
          <Input
            onChange={(e) => setemail(e.target.value)}
            type="email"
            placeholder="Email"
            required
          />
        </Item>
        <Item>
          <Input
            onChange={(e) => setpassword(e.target.value)}
            type="Password"
            placeholder="Password"
            required
          />
        </Item>

        <Btn type="submit"> Login</Btn>
        <Link to="/forgot">Forgot password ?</Link>
      </Form>
    </Container>
  );
};

export default Login;
