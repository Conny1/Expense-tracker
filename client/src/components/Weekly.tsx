import { styled } from "styled-components";
import Table from "rc-table";
import { useMemo } from "react";
import { mobile } from "./utils/Responsive";
import { useWeeklyExpenseIncomeQuery } from "./utils/reduxtollkitquery";

const columns = [
  {
    title: "Year",
    dataIndex: "year",
    key: "year",
    width: 50,
  },
  {
    title: "Month",
    dataIndex: "month",
    key: "month",
    width: 50,
  },
  {
    title: "Week",
    dataIndex: "week",
    key: "week",
    width: 50,
  },
  {
    title: "TotalExpense",
    dataIndex: "totalExpense",
    key: "totalExpense",
    width: 100,
  },
  {
    title: "TotalIncome",
    dataIndex: "totalIncome",
    key: "totalIncome",
    with: 150,
  },

  {
    title: "TotalProfit",
    dataIndex: "totalProfit",
    key: "totalProfit",
    with: 200,
  },

  {
    title: "TotalLoss",
    dataIndex: "totalLoss",
    key: "totalLoss",
    with: 200,
  },
];

const Container = styled.div`
  max-height: 70vh;
  overflow: scroll;
  ${mobile({ width: "100%" })};
`;

type Props = {
  businessID: string | number;
};

const Weekly = ({ businessID }: Props) => {
  const {
    data: weeklyData,
    isLoading: isweeklyloading,
    error: weeklyError,
  } = useWeeklyExpenseIncomeQuery(businessID);
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
    if (!weeklyData?.length) return [];
    const values = weeklyData?.map((item, i: number) => {
      const w = {
        year: item.year,
        month: months[Number(item.month) - 1],
        week: item.week_in_month,
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
  }, [weeklyData, months]);

  if (isweeklyloading) {
    return <>Loading...</>;
  }

  if (weeklyError) {
    return <>Error fectingData. Refresh page</>;
  }

  if (!weeklyData?.length) {
    return <>Business data not found !!!</>;
  }

  return (
    <Container>
      <h4>Weekly</h4>
      <Table className="table" columns={columns} data={Data} />{" "}
    </Container>
  );
};

export default Weekly;
