import { authenticateToken } from "@/middlewares";
import { Router } from "express";

const paymentsRouter = Router();

paymentsRouter
    .get("/:ticketId",authenticateToken, )
    .post("/process", authenticateToken, )

export { paymentsRouter };
