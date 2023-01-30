import { getAllTicketsTypes, getUserTicket, postUserTicket } from "@/controllers";
import { authenticateToken } from "@/middlewares";
import { Router } from "express";

const ticketsRouter = Router();

ticketsRouter
    .get("/types",authenticateToken, getAllTicketsTypes)
    .get("/", authenticateToken, getUserTicket)
    .post("/", authenticateToken, postUserTicket)

export { ticketsRouter };
