import { connection } from "../utils/db.js";
import createError from "../utils/error.js";

export const addBusiness = (req, resp, next) => {
  const newData = {
    business_name: req.body.business_name,
  };

  //   console.log(newData);
  // Insert data into the business_names table
  const query = "INSERT INTO expensemanager.business_names SET ?";

  connection.query(query, newData, (error, results) => {
    // console.log(error);
    if (error) {
      return next(createError(500, error.message));
    } else {
      console.log("Data inserted successfully.");

      //   console.log(results);
      return resp.status(200).json({
        success: true,
        status: 200,
        message: "BusinessName added sucefully",
      });
    }

    // Close the database connection
    // connection.end();
  });
};

export const getallBusiness = (req, resp, next) => {
  const query = "SELECT * FROM expensemanager.business_names";

  connection.query(query, (err, results) => {
    if (err) {
      return next(createError(500, "Database error"));
    } else {
      if (results.length === 0) {
        return resp.status(200).json({
          success: true,
          status: 404,
          message: "Data not found. Add!!",
        });
      }
      //   console.log(results);
      return resp.status(200).json(results);
    }
  });
};

export const addIncomeandExpense = (req, resp, next) => {
  const newData = {
    business_id: req.body.business_id,
    income: req.body.income,
    expense: req.body.expense,
    transaction_date: req.body.date,
  };

  // Insert data into the income_expense table
  const query = "INSERT INTO expensemanager.income_expense SET ?";

  connection.query(query, newData, (error, results) => {
    if (error) {
      return next(createError(500, error.message));
    } else {
      console.log("Data inserted successfully.");
      //   console.log(results);
      return resp
        .status(200)
        .json({ success: true, status: 200, message: "Data added sucefully" });
    }

    // Close the database connection
  });
};

// get Amount by business id
export const getallAmountByBusinessID = (req, resp, next) => {
  const business_id = Number(req.params.id);
  const query =
    "SELECT * FROM expensemanager.income_expense WHERE business_id=? ";

  connection.query(query, [business_id], (err, results) => {
    if (err) {
      return next(createError(500, "Database error"));
    } else {
      if (results.length === 0) {
        return resp.status(200).json({
          success: true,
          status: 404,
          message: "Data not found. Add!!",
        });
      }
      //   console.log(results);
      return resp.status(200).json(results);
    }
  });
};

// getData by Daily
export const getAmountBasedOnDay = (req, resp, next) => {
  const business_id = Number(req.params.id);

  //   console.log(newData);
  const query =
    "SELECT    YEAR(transaction_date) AS year,    MONTH(transaction_date) AS month,    DAY(transaction_date) AS day,    SUM(income) AS total_income,    SUM(expense) AS total_expense FROM    expensemanager.income_expense WHERE    YEAR(transaction_date) = YEAR(CURDATE()) AND business_id=? GROUP BY    YEAR(transaction_date), MONTH(transaction_date), DAY(transaction_date) ORDER BY     YEAR(transaction_date), MONTH(transaction_date), DAY(transaction_date)";

  connection.query(query, [business_id], (err, results) => {
    if (err) {
      return next(createError(500, "Database error"));
    } else {
      //   console.log(results);
      if (results.length === 0) {
        return resp.status(200).json({
          success: true,
          status: 404,
          message: "Data not found.",
        });
      }
      //   console.log(results);
      return resp.status(200).json(results);
    }
  });
};

// getData by Monthly
export const getAmountBasedMonth = (req, resp, next) => {
  const business_id = Number(req.params.id);
  const query =
    "SELECT YEAR(transaction_date) AS year, MONTH(transaction_date) AS month, SUM(income) AS total_income, SUM(expense) AS total_expense  FROM  expensemanager.income_expense  WHERE   YEAR(transaction_date) = YEAR(CURDATE()) AND business_id=?  GROUP BY  YEAR(transaction_date), MONTH(transaction_date) ORDER BY  YEAR(transaction_date), MONTH(transaction_date)";

  connection.query(query, [business_id], (err, results) => {
    if (err) {
      return next(createError(500, "Database error"));
    } else {
      if (results.length === 0) {
        return resp.status(200).json({
          success: true,
          status: 404,
          message: "Data not found.",
        });
      }
      //   console.log(results);
      return resp.status(200).json(results);
    }
  });
};

// getData by week
export const getAmountBasedWeek = (req, resp, next) => {
  const business_id = Number(req.params.id);
  const query =
    "SELECT  YEAR(transaction_date) AS year,  MONTH(transaction_date) AS month, FLOOR((DAY(transaction_date) - 1) / 7) + 1 AS week_in_month, transaction_date, business_id,  SUM(income) AS total_income,  SUM(expense) AS total_expense FROM    expensemanager.income_expense WHERE  YEAR(transaction_date) = YEAR(CURDATE()) AND business_id =? GROUP BY  year, month, week_in_month, transaction_date ORDER BY   year, month, week_in_month";

  connection.query(query, [business_id], (err, results) => {
    if (err) {
      return next(createError(500, "Database error"));
    } else {
      if (results.length === 0) {
        return resp.status(200).json({
          success: true,
          status: 404,
          message: "Data not found.",
        });
      }
      //   console.log(results);
      return resp.status(200).json(results);
    }
  });
};
