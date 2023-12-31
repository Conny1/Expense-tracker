import Addbusiness from "../components/Addbusiness";
import Select, { ActionMeta, SingleValue, StylesConfig } from "react-select";
import BusinessInput from "../components/BusinessInput";
import BusinessTable from "../components/BusinessTable";
import Nav from "../components/Nav";
import { styled } from "styled-components";
import { useEffect, useState } from "react";
import Monthly from "../components/Monthly";
import { mobile } from "../components/utils/Responsive";
import { useGetBusinessQuery } from "../components/utils/reduxtollkitquery";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// styles
const Container = styled.div`
  /* outline: 1px solid yellow; */
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
  ${mobile({ flexDirection: "column" })};
`;
const Values = styled.div`
  flex: 1;
  max-height: 70vh;
  overflow: scroll;
`;
const Item = styled.div`
  width: 100%;
  ${mobile({ minHeight: "150px" })};
`;

const Analysis = styled.div`
  margin-top: 10px;
  display: flex;
  width: 90%;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  ${mobile({ flexDirection: "column", width: "90%" })};
`;

export type BusinessOptions = {
  value: string | number | undefined;
  label: string;
};

const Dashboard = () => {
  const [businessID, setbusinessID] = useState<string | number>("");

  const [options, setoptions] = useState<BusinessOptions[]>([
    {
      value: "",
      label: "",
    },
  ]);
  const navigate = useNavigate();

  // select box
  const selectBusiness = (
    options: SingleValue<BusinessOptions> | ActionMeta<unknown> | unknown
  ) => {
    const selectedOption = options as SingleValue<BusinessOptions>;
    if (selectedOption) {
      if ("value" in selectedOption && "label" in selectedOption) {
        if (selectedOption?.label && selectedOption?.value) {
          setbusinessID(selectedOption?.value);
        }
      }
    }
  };

  const { data, error, isSuccess } = useGetBusinessQuery();

  useEffect(() => {
    const user = localStorage.getItem("user");

    if (!user) {
      navigate("/login");
    }
  }, [navigate]);

  // map data into options and labels
  useEffect(() => {
    const makeOptions = () => {
      if (error) {
        if ("status" in error)
          if (error.status === 500) {
            toast("Error, Try again");
          }

        if ("status" in error) {
          if (error.status === 401) {
            toast("Your session has expired. Redirecting...");
            setTimeout(() => {
              navigate("/login");
            }, 2000);
          }
        }
      }
      if (isSuccess && data.length > 0) {
        const vals = data?.map((item) => {
          return { label: item.business_name, value: item.business_id };
        });
        if (vals) {
          setoptions(vals);
        }
      }
    };

    makeOptions();
  }, [data, error, navigate, isSuccess]);

  // react select custome styles
  const customStyles: StylesConfig = {
    option: (provided, state) => ({
      ...provided,
      color: state.isSelected ? "white" : "blue", // Set text color to blue
    }),
  };
  return (
    <Container>
      <Nav />
      <Section></Section>
      <Addbusiness />
      <BodyContainer>
        <BusinessInput options={options} />
        <Values>
          <h5>Daily profit and loss per business</h5>
          <Item>
            <Select
              className="basic-single"
              classNamePrefix="select"
              name="business"
              styles={customStyles}
              options={options}
              onChange={selectBusiness}
            />
          </Item>

          <BusinessTable businessID={businessID} />
        </Values>
      </BodyContainer>

      <Analysis>
        <Monthly businessID={businessID} />
      </Analysis>
      <ToastContainer />
    </Container>
  );
};

export default Dashboard;
