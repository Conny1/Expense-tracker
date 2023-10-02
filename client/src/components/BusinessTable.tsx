import { styled } from "styled-components";
import { useEffect } from "react";
import {
  useDailyExpenseIncomeQuery,
  useDeleteProfitlossMutation,
} from "./utils/reduxtollkitquery";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Container = styled.table`
  width: 100%;
  border: 1px solid gainsboro;
`;
const TableRow = styled.tr`
  border: 1px solid gainsboro;
`;
const Tablehead = styled.th`
  background-color: #0d6efd;
  color: #fff;
`;
const Tabledata = styled.td`
  border: 1px solid gainsboro;
`;
const Btn = styled.button`
  flex: 1;
`;

type Props = {
  businessID: string | number;
};

const BusinessTable = ({ businessID }: Props) => {
  const navigate = useNavigate();
  const {
    data: incomeExpensedata,
    isLoading: incomeExpenseLoading,
    error: expenseincomeError,
  } = useDailyExpenseIncomeQuery(businessID);

  const [deleteProfitloss, { isLoading, isSuccess, error }] =
    useDeleteProfitlossMutation();

  useEffect(() => {
    if (isLoading) {
      toast("Deleting..");
    }
    if (isSuccess) {
      toast("Data Deleted sucessfuly");
    }
    if (error) {
      toast("Error, Try again");
      if ("status" in error) {
        if (error.status === 401) {
          toast("Your session has expired. Redirecting...");
          setTimeout(() => {
            navigate("/login");
          }, 2000);
        }
      }
    }
  }, [isLoading, isSuccess, error, navigate]);

  if (incomeExpenseLoading) {
    return <>Loading...</>;
  }

  if (expenseincomeError) {
    return <>Error fectingData. Refresh page</>;
  }

  if (!incomeExpensedata?.length) {
    return <>Business data not found !!!</>;
  }

  const deleteValues = (
    business_id: string | number | undefined,
    transaction_date: string | Date
  ) => {
    const date = new Date(transaction_date).toLocaleDateString().split("/");

    const date2 = `${date[2]}-${date[0]}-${date[1]}`;
    if (business_id && date2) {
      const body = {
        business_id,
        transaction_date: date2,
      };
      deleteProfitloss(body);
    }
  };

  return (
    <Container>
      <ToastContainer />
      <thead>
        <TableRow>
          <Tablehead>Date</Tablehead>
          <Tablehead>income</Tablehead>
          <Tablehead>Expense</Tablehead>
          <Tablehead>Profit</Tablehead>
          <Tablehead>Loss</Tablehead>
          <Tablehead>Description</Tablehead>
          <Tablehead>Actions</Tablehead>
        </TableRow>
      </thead>
      <tbody
        style={{
          backgroundColor: "#a5c7fa",
          color: "#fff",
        }}
      >
        {incomeExpensedata?.map((item, i: number) => {
          const formattedDate = new Date(item.transaction_date);
          return (
            <TableRow key={i}>
              <Tabledata>{formattedDate.toDateString()}</Tabledata>
              <Tabledata>{item.income}</Tabledata>
              <Tabledata>{item.expense}</Tabledata>
              <Tabledata>
                {item.expense < item.income ? item.income - item.expense : "0"}
              </Tabledata>
              <Tabledata>
                {item.expense > item.income ? item.expense - item.income : "0"}
              </Tabledata>
              <Tabledata>{item.description}</Tabledata>
              <Tabledata
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                  gap: "5px",
                }}
              >
                <Btn
                  onClick={() =>
                    navigate(`/update/${item.business_id}`, {
                      state: {
                        transaction_date: item.transaction_date,
                        business_id: item.business_id,
                        income: item.income,
                        expense: item.expense,
                        description: item.description,
                      },
                    })
                  }
                >
                  Edit
                </Btn>

                <Btn
                  onClick={() => {
                    deleteValues(item.business_id, item.transaction_date);
                  }}
                >
                  🗑️
                </Btn>
              </Tabledata>
            </TableRow>
          );
        })}
      </tbody>
    </Container>
  );
};
export default BusinessTable;
