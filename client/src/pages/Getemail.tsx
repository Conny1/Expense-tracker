import { useEffect, useState } from "react";
import styled from "styled-components";
import "react-toastify/dist/ReactToastify.css";
import { useVerifyemailMutation } from "../components/utils/reduxtollkitquery";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
// import nodemailer from 'nodemailer';

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

const Getemail = () => {
  const [email, setemail] = useState("");

  const [verifyemail, { isLoading, isSuccess, error }] =
    useVerifyemailMutation();

  const send = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (email === "") return toast("Enter email");
    verifyemail({ email });
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (isLoading) toast("loading...");
    if (isSuccess) {
      toast("password reset link has been sent to your email");
      setTimeout(() => {
        navigate("/passwordreset");
      }, 3000);
    }
    if (error) {
      if ("status" in error) {
        if (error.status === 404) {
          toast("Account with that email does not exist");
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
      <h3>Enter email to cofirm account</h3>
      <Form onSubmit={send}>
        <Item>
          <Input
            onChange={(e) => setemail(e.target.value)}
            type="email"
            placeholder="Email"
            required
          />
        </Item>

        <Btn type="submit"> Submit</Btn>
      </Form>
    </Container>
  );
};

export default Getemail;
