import { getPaymentInfo, postPayment } from "@/controllers";
import { authenticateToken } from "@/middlewares";
import { Router } from "express";

const paymentsRouter = Router();

paymentsRouter
  .get("/", authenticateToken, getPaymentInfo)
  .post("/process", authenticateToken, postPayment);

export { paymentsRouter };
