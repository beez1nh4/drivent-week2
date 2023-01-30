import { AuthenticatedRequest } from "@/middlewares";
import paymentsService from "@/services/payments-services";
import { Request, Response } from "express";
import httpStatus from "http-status";

export async function getPaymentInfo(req: AuthenticatedRequest, res: Response) {
  try {
    const userId = req.userId;
    const ticketId = Number(req.query.ticketId);

    if (!ticketId){
      res.sendStatus(httpStatus.BAD_REQUEST);
    }

    const paymentInfo = await paymentsService.checkInfoPayment(ticketId, userId);
    res.send(paymentInfo);
    
  } catch (error) {
    if (error.name === "UnauthorizedError") {
      return res.sendStatus(401);
      }
    if (error.name === "NotFoundError") {
      return res.sendStatus(404);
      }
    return res.sendStatus(httpStatus.NO_CONTENT);
  }
}

export async function postPayment(req:AuthenticatedRequest, res: Response) {
  try {
    const userId = req.userId;
    const body = req.body;

    if (!body || !body.ticketId || ! body.cardData){
      res.sendStatus(400);
    }

    const paymentInfo = await paymentsService.paymentProcess(body, userId);
    res.send(paymentInfo);
    
  } catch (error) {
    if (error.name === "UnauthorizedError") {
      return res.sendStatus(401);
      }
    if (error.name === "NotFoundError") {
      return res.sendStatus(404);
      }
    return res.sendStatus(httpStatus.NO_CONTENT);
  }
}
