import express from "express";
import {
  addBusiness,
  addIncomeandExpense,
  getAmountBasedMonth,
  getAmountBasedOnDay,
  getAmountBasedWeek,
  getallAmountByBusinessID,
  getallBusiness,
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
router.get("/get/month/:id", VerifyTokens, getAmountBasedMonth);

// get databased on currentDate
router.get("/get/week/:id", VerifyTokens, getAmountBasedWeek);

export default router;
