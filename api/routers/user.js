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

const router = express.Router();

router.post("/add/amount", addIncomeandExpense);

router.post("/add/business", addBusiness);

router.get("/get/business", getallBusiness);

router.post("/get/amount/:id", getallAmountByBusinessID);
// get databased on currentDate
router.get("/get/currentdateamount/:id", getAmountBasedOnDay);

// get databased on currentDate
router.get("/get/month/:id", getAmountBasedMonth);

// get databased on currentDate
router.get("/get/week/:id", getAmountBasedWeek);

export default router;
