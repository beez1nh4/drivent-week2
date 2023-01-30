import { getAllTicketsTypes, getUserTicket } from "@/controllers";
import { authenticateToken } from "@/middlewares";
import { Router } from "express";

const ticketsRouter = Router();

ticketsRouter
    .get("/types",authenticateToken, getAllTicketsTypes)
    .get("/", authenticateToken, getUserTicket)

export { ticketsRouter };
