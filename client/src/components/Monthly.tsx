import { styled } from "styled-components";
import Table from "rc-table";
import { useEffect, useMemo } from "react";
import { mobile } from "./utils/Responsive";
import { useMonthlyExpenseIncomeQuery } from "./utils/reduxtollkitquery";
import { useNavigate } from "react-router-dom";

const columns = [
  {
    title: "Year",
    dataIndex: "year",
    key: "year",
    // width: 50,
  },
  {
    title: "Month",
    dataIndex: "month",
    key: "month",
    // width: 50,
  },
  {
    title: "TotalExpense",
    dataIndex: "totalExpense",
    key: "totalExpense",
    // width: 100,
  },
  {
    title: "TotalIncome",
    dataIndex: "totalIncome",
    key: "totalIncome",
    // with: 150,
  },

  {
    title: "TotalProfit",
    dataIndex: "totalProfit",
    key: "totalProfit",
    // with: 200,
  },

  {
    title: "TotalLoss",
    dataIndex: "totalLoss",
    key: "totalLoss",
    // with: 200,
  },
];

const Container = styled.div`
  max-height: 70vh;
  overflow: scroll;
  ${mobile({ width: "100%", marginTop: "100px" })};
  display: flex;
  flex-direction: column;
`;

type Props = {
  businessID: string | number;
};

const Monthly = ({ businessID }: Props) => {
  const navigate = useNavigate();
  const {
    data: monthlyData,
    isLoading: isMonthlyloading,
    error: monthlyError,
  } = useMonthlyExpenseIncomeQuery(businessID);
  const months = useMemo(
    () => [
      "jan",
      "feb",
      "mar",
      "apr",
      "may",
      "jun",
      "jul",
      "aug",
      "sep",
      "oct",
      "nov",
      "dec",
    ],
    []
  );

  const Data = useMemo(() => {
    if (!monthlyData?.length) return [];
    const values = monthlyData?.map((item, i: number) => {
      const w = {
        year: item.year,
        month: months[Number(item.month) - 1],
        totalExpense: item.total_expense,
        totalIncome: item.total_income,
        totalProfit:
          item.total_income > item.total_expense
            ? item.total_income - item.total_expense
            : 0,
        totalLoss:
          item.total_income < item.total_expense
            ? item.total_expense - item.total_income
            : 0,
        key: i,
      };
      return w;
    });

    return values;
  }, [monthlyData, months]);

  useEffect(() => {
    if (monthlyError) {
      if ("status" in monthlyError) {
        if (monthlyError.status === 400 || monthlyError.status === 401) {
          navigate("/login");
        }
      }
    }
  }, [monthlyError, navigate]);

  if (isMonthlyloading) {
    return <>Loading...</>;
  }

  if (monthlyError) {
    return <>Error fectingData. Refresh page</>;
  }

  if (!monthlyData?.length) {
    return <>Business data not found !!!</>;
  }

  return (
    <Container>
      <h4>Monthly</h4>
      <Table className="table" columns={columns} data={Data} />{" "}
    </Container>
  );
};

export default Monthly;
