import express from "express";
import {
  addBusiness,
  addIncomeandExpense,
  deleteBisinessName,
  deleteProfirLoss,
  getAmountBasedMonth,
  getAmountBasedOnDay,
  getAmountBasedWeek,
  getallAmountByBusinessID,
  getallBusiness,
  updaeticomeExpese,
} from "../controllers/user.js";
import { VerifyTokens } from "../utils/verifyTokens.js";

const router = express.Router();

router.post("/add/amount", VerifyTokens, addIncomeandExpense);

router.post("/add/business", VerifyTokens, addBusiness);

router.get("/get/business", VerifyTokens, getallBusiness);

router.get("/get/amount/:id", VerifyTokens, getallAmountByBusinessID);
// get databased on currentDate
router.get("/get/currentdateamount/:id", VerifyTokens, getAmountBasedOnDay);

// get databased on currentDate
router.post(
  "/get/month/:id/:strdate/:enddate",
  VerifyTokens,
  getAmountBasedMonth
);

// get databased on currentDate
router.get("/get/week/:id", VerifyTokens, getAmountBasedWeek);

// delete profit || loss
router.delete("/deleteProfitloss/:id", VerifyTokens, deleteProfirLoss);

// edit income expense
router.put("/editIncomeExpense/:id/:date", VerifyTokens, updaeticomeExpese);
// delete businessNames
router.delete("/deletebusinessnames/:id", VerifyTokens, deleteBisinessName);

export default router;
