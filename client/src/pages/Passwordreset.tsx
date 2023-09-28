import { useState, useEffect } from "react";
import styled from "styled-components";
import "react-toastify/dist/ReactToastify.css";
import { useChangePasswordMutation } from "../components/utils/reduxtollkitquery";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

const Passwordreset = () => {
  const [newpassword, setnewpassword] = useState("");
  const [email, setemail] = useState("");

  const navigate = useNavigate();

  const [changePassword, { isSuccess, isLoading, error }] =
    useChangePasswordMutation();
  const send = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (email === "" || newpassword === "")
      return toast("Enter required credentials");
    changePassword({
      email,
      password: newpassword,
    });
  };

  useEffect(() => {
    if (isLoading) toast("loading...");
    if (isSuccess) {
      toast("success. Redirecting to LoginPage");
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    }
    if (error) {
      if ("status" in error) {
        if (error.status === 401) {
          toast("Invalid Email");
        }

        if (error.status === 500) {
          toast("network error try gain");
        }
      }
    }
  }, [isLoading, error, isSuccess, navigate]);

  return (
    <Container>
      <ToastContainer />
      <h3>Enter the required credentials</h3>
      <Form onSubmit={send}>
        <Item>
          <Input
            onChange={(e) => setemail(e.target.value)}
            type="email"
            placeholder="email"
            required
          />
        </Item>
        <Item>
          <Input
            onChange={(e) => setnewpassword(e.target.value)}
            type="text"
            placeholder="newpassword"
            required
          />
        </Item>

        <Btn type="submit"> Reset</Btn>
      </Form>
    </Container>
  );
};

export default Passwordreset;
