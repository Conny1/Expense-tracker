import { connection } from "../utils/db.js";
import createError from "../utils/error.js";

export const addBusiness = (req, resp, next) => {
  const newData = {
    business_name: req.body.business_name,
  };

  //   console.log(newData);
  // Insert data into the business_names table
  const query = "INSERT INTO analysis_expensemanager.business_names SET ?";

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
  const query = "SELECT * FROM analysis_expensemanager.business_names";

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
    transaction_date: req.body.transaction_date,
    description: req.body.description,
  };

  // Insert data into the income_expense table
  const query = "INSERT INTO  analysis_expensemanager.income_expense SET ?";

  connection.query(query, newData, (error, results) => {
    if (error) {
      // console.log(error);
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
    "SELECT * FROM analysis_expensemanager.income_expense WHERE business_id=? ORDER BY transaction_date DESC ";

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
    "SELECT    YEAR(transaction_date) AS year,    MONTH(transaction_date) AS month,    DAY(transaction_date) AS day,    SUM(income) AS total_income,    SUM(expense) AS total_expense FROM    analysis_expensemanager.income_expense WHERE    YEAR(transaction_date) = YEAR(CURDATE()) AND business_id=? GROUP BY    YEAR(transaction_date), MONTH(transaction_date), DAY(transaction_date) ORDER BY     YEAR(transaction_date), MONTH(transaction_date), DAY(transaction_date)";

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
    "SELECT YEAR(transaction_date) AS year, MONTH(transaction_date) AS month, SUM(income) AS total_income, SUM(expense) AS total_expense  FROM  analysis_expensemanager.income_expense  WHERE   YEAR(transaction_date) = YEAR(CURDATE()) AND business_id=?  GROUP BY  YEAR(transaction_date), MONTH(transaction_date) ORDER BY  YEAR(transaction_date), MONTH(transaction_date)";

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
    "SELECT    business_id,    YEAR(transaction_date) AS year,    MONTH(transaction_date) AS month,    FLOOR((DAY(transaction_date) - 1) / 7) + 1 AS week_in_month,    SUM(income) AS total_income,    SUM(expense) AS total_expense FROM    analysis_expensemanager.income_expense WHERE     YEAR(transaction_date) = YEAR(CURDATE())     AND business_id =? GROUP BY     business_id, year, month, week_in_month";

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

// delete icome expense

export const deleteProfirLoss = (req, resp, next) => {
  const business_id = Number(req.params.id);
  const transaction_date = req.body.transaction_date;
  //   console.log(newData);
  const query =
    "DELETE FROM  analysis_expensemanager.income_expense WHERE business_id=? AND transaction_date=?";

  const values = [business_id, transaction_date];
  connection.query(query, values, (err, results) => {
    // console.log(err);
    if (err) {
      return next(createError(500, "Delete server Error"));
    } else {
      // console.log(results);
      return resp.status(200).json({
        success: true,
        status: 200,
        Message: "data deleted suceefuly",
      });
    }
  });
};

// update income expense
export const updaeticomeExpese = (req, resp, next) => {
  const business_id = Number(req.params.id);
  const dateurl = req.params.date;
  const transaction_date = req.body.transaction_date;
  const income = req.body.income;
  const expense = req.body.expense;
  const description = req.body.description;
  // console.log(req.body);

  const query =
    "UPDATE  analysis_expensemanager.income_expense  SET income=?, expense=?, description=?, transaction_date=? WHERE business_id=? AND transaction_date=?";

  const values = [
    income,
    expense,
    description,
    transaction_date,
    business_id,
    dateurl,
  ];
  connection.query(query, values, (err, results) => {
    // console.log(err);
    if (err) {
      // console.log(err);
      return next(createError(500, "Edit server Error"));
    } else {
      // console.log(results);
      return resp.status(200).json({
        success: true,
        status: 200,
        Message: "data edited suceefuly",
      });
    }
  });
};

export const deleteBisinessName = (req, resp, next) => {
  const business_id = Number(req.params.id);
  //   console.log(newData);
  const query =
    "DELETE FROM  analysis_expensemanager.business_names WHERE business_id=?";

  const values = [business_id];
  connection.query(query, values, (err, results) => {
    // console.log(err);
    if (err) {
      return next(createError(500, "Delete server Error"));
    } else {
      return resp.status(200).json({
        success: true,
        status: 200,
        Message: "data deleted suceefuly",
      });
    }
  });
};
