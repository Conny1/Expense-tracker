import { styled } from "styled-components";
import { useEffect, useState } from "react";
import { mobile } from "./utils/Responsive";
import { useDailyExpenseIncomeQuery } from "./utils/reduxtollkitquery";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import Amount from "./Amount";

const Container = styled.div`
  max-height: 70vh;
  ${mobile({ width: "100%", marginTop: "100px" })};
  display: flex;
  flex-direction: column;
`;

const Item = styled.div``;
const AmountGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;

  ${mobile({
    width: "100%",
    flexDirection: "column",

    alignItems: "center",
  })};
`;

type Props = {
  businessID: string | number;
};

type DataType = {
  Totalincome: number;
  Totalexpense: number;
};

const Monthly = ({ businessID }: Props) => {
  const [Data, setData] = useState<DataType>({
    Totalincome: 0,
    Totalexpense: 0,
  });
  const [startdate, setstartdate] = useState("");
  const [enddate, setenddate] = useState("");
  const navigate = useNavigate();
  const {
    data: monthlyData,
    isLoading: isMonthlyloading,
    error: monthlyError,
  } = useDailyExpenseIncomeQuery(businessID);
  // const months = useMemo(
  //   () => [
  //     "jan",
  //     "feb",
  //     "mar",
  //     "apr",
  //     "may",
  //     "jun",
  //     "jul",
  //     "aug",
  //     "sep",
  //     "oct",
  //     "nov",
  //     "dec",
  //   ],
  //   []
  // );

  const generateTotal = () => {
    if (!startdate || !enddate) return alert("Input required dates");
    const Sdate = format(new Date(startdate), "dd-MMM-yyy");
    const Edate = format(new Date(enddate), "dd-MMM-yyy");
    const tocal = monthlyData?.map((item) => {
      const itemdate = format(new Date(item.transaction_date), "dd-MMM-yyy");
      if (Sdate <= itemdate && Edate >= itemdate) {
        return {
          expense: item.expense,
          income: item.income,
        };
      }

      return [];
    });
    let Totalincome = 0;
    let Totalexpense = 0;

    if (tocal) {
      for (let i = 0; i < tocal.length; i++) {
        if ("income" in tocal[i] || "expense" in tocal[i]) {
          const totaldata = tocal[i] as { income: number; expense: number };
          Totalincome += totaldata.income;
          Totalexpense += totaldata.expense;
        }
      }

      setData({
        Totalincome,
        Totalexpense,
      });
    }

    // console.log({
    //   startdate,
    //   enddate,
    // });
  };

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
      <h4>Monthly && weekly </h4>
      <Item>
        <label htmlFor="strDate">
          <b>Start date:</b>
        </label>
        <input
          onChange={(e) => setstartdate(e.target.value)}
          type="date"
          name="strdate"
          id="strdate"
        />
        <br />
        <label htmlFor="endDate">
          <b>End date:</b>
        </label>
        <input
          onChange={(e) => setenddate(e.target.value)}
          type="date"
          name="enddate"
          id="enddate"
        />
        <br />
        <button onClick={generateTotal}>Generate Data</button>
      </Item>
      <h4>Total of selected days</h4>
      <AmountGroup>
        <Amount text="income" total={Data.Totalincome} />
        <Amount text="expense" total={Data.Totalexpense} />
        <Amount
          text="profit"
          total={
            Data.Totalincome > Data.Totalexpense
              ? Data.Totalincome - Data.Totalexpense
              : 0
          }
        />
        <Amount
          text="loss"
          total={
            Data.Totalincome < Data.Totalexpense
              ? Data.Totalexpense - Data.Totalincome
              : 0
          }
        />{" "}
      </AmountGroup>
    </Container>
  );
};

export default Monthly;
