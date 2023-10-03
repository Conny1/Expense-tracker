import { useEffect, useState } from "react";
import styled from "styled-components";
import {
  useAddBusinessMutation,
  useDeleteBusinessNamesMutation,
  useGetBusinessQuery,
} from "./utils/reduxtollkitquery";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
const Container = styled.div`
  /* outline: 1px solid red; */
  width: 400px;
  height: 50px;
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 30px;
`;
const Form = styled.form`
  flex: 1;
  display: flex;
`;
const Input = styled.input`
  flex: 1;
`;

const Modal = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 10px;
  border-radius: 10px;
  height: auto;
  background-color: #0468ff;
  color: #fff;
  position: absolute;
  top: 30%;
  z-index: 999;
`;

const Business = styled.div`
  width: 80%;
`;
const Item = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* outline: 1px solid red; */
  p {
    font-size: 15px;
    font-weight: bold;
    color: #fff;
    text-transform: capitalize;
  }
`;

const Addbusiness = () => {
  const [name, setname] = useState("");
  const [modal, setModal] = useState(false);
  const navigate = useNavigate();
  // add business mutation

  const [AddBusiness, { isLoading, isSuccess, error }] =
    useAddBusinessMutation();
  const { data: businessNamesdata, error: getbusinessError } =
    useGetBusinessQuery();

  const submitBusiness = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (name !== "") {
      await AddBusiness({ business_name: name });
    }
  };

  const [
    deleteBusinessNames,
    { isLoading: deleteLoading, isSuccess: deleteSucess, error: deleteError },
  ] = useDeleteBusinessNamesMutation();

  useEffect(() => {
    if (getbusinessError) {
      toast("Error.Try again!!");
      if ("status" in getbusinessError) {
        if (
          getbusinessError.status === 401 ||
          getbusinessError.status === 401
        ) {
          toast("Your session has expired. Redirecting...");
          setTimeout(() => {
            navigate("/login");
          }, 2000);
        }
      }
    }

    if (error) {
      toast("Error.Try again!!");
      if ("status" in error) {
        if (error.status === 401 || error.status === 400) {
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
  }, [isLoading, isSuccess, error, navigate, getbusinessError]);

  useEffect(() => {
    if (deleteError) {
      toast("Error.Try again!!");
      if ("status" in deleteError) {
        if (deleteError.status === 401 || deleteError.status === 400) {
          toast("Your session has expired. Redirecting...");
          setTimeout(() => {
            navigate("/login");
          }, 2000);
        }
      }
    }
    if (deleteLoading) {
      toast("loading..");
    }
    if (deleteSucess) {
      toast("Data deleted sucessfuly");
    }
  }, [deleteError, deleteSucess, navigate, deleteLoading]);

  // delete business funtionalty
  const deleteBusiness = (business_id: string | number | undefined) => {
    if (business_id) {
      const body = {
        business_id,
      };
      deleteBusinessNames(body);
    }
  };
  return (
    <Container>
      <button onClick={() => setModal(true)}>Add New business</button>
      {modal && <button onClick={() => setModal(false)}>❌</button>}
      <ToastContainer />
      {modal && (
        <Modal>
          <Form onSubmit={submitBusiness}>
            <Input
              onChange={(e) => setname(e.target.value)}
              type="text"
              placeholder="Enter Business Name"
              required
            />
            <button type="submit"> Add</button>
          </Form>
          {businessNamesdata?.length && (
            <p>Delete business name with its records</p>
          )}
          {businessNamesdata?.length && (
            <Business>
              {businessNamesdata?.map((item) => {
                return (
                  <Item key={item?.business_id}>
                    <p>{item?.business_name}</p>
                    <button onClick={() => deleteBusiness(item?.business_id)}>
                      🗑️
                    </button>
                  </Item>
                );
              })}
            </Business>
          )}
        </Modal>
      )}
    </Container>
  );
};

export default Addbusiness;
