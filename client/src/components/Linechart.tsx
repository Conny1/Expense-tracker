import { useMemo } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useMonthlyExpenseIncomeQuery } from "./utils/reduxtollkitquery";

type Props = {
  businessID: string | number;
};

const Linechart = ({ businessID }: Props) => {
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

  const constcalculatedData = useMemo(() => {
    if (!monthlyData?.length) return [];
    const vals = monthlyData?.map((item) => {
      return {
        name: months[Number(item.month) - 1],
        profit:
          item.total_income > item.total_expense
            ? item.total_income - item.total_expense
            : 0,
        loss:
          item.total_income < item.total_expense
            ? item.total_expense - item.total_income
            : 0,
      };
    });

    return vals;
  }, [monthlyData, months]);

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
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        width={500}
        height={300}
        data={constcalculatedData}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="loss"
          stroke="#8884d8"
          activeDot={{ r: 8 }}
        />
        <Line type="monotone" dataKey="profit" stroke="#82ca9d" />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default Linechart;
