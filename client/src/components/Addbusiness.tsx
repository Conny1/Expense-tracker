import { useEffect, useState } from "react";
import styled from "styled-components";
import { useAddBusinessMutation } from "./utils/reduxtollkitquery";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
const Container = styled.div`
  /* outline: 1px solid red; */
  width: 400px;
  height: 50px;
  margin-top: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Form = styled.form`
  flex: 1;
  display: flex;
`;
const Input = styled.input`
  flex: 1;
`;

const Addbusiness = () => {
  const [name, setname] = useState("");
  const navigate = useNavigate();
  // add business mutation

  const [AddBusiness, { isLoading, isSuccess, error }] =
    useAddBusinessMutation();

  const submitBusiness = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (name !== "") {
      await AddBusiness({ business_name: name });
    }
  };

  useEffect(() => {
    if (error) {
      toast("Error.Try again!!");
      if ("status" in error) {
        if (error.status === 401) {
          toast("Your session has expired. Redirecting...");
          setTimeout(() => {
            navigate("/login");
          }, 2000);
        }
      }
    }
    if (isLoading) {
      toast("submiting..");
    }
    if (isSuccess) {
      toast("Data added sucessfuly");
    }
  }, [isLoading, isSuccess, error, navigate]);
  return (
    <Container>
      <ToastContainer />
      <Form onSubmit={submitBusiness}>
        <Input
          onChange={(e) => setname(e.target.value)}
          type="text"
          placeholder="Enter Business Name"
          required
        />
        <button type="submit"> Add</button>
      </Form>
    </Container>
  );
};

export default Addbusiness;
