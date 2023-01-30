import { notFoundError } from "@/errors";
import { AuthenticatedRequest } from "@/middlewares";
import paymentsService from "@/services/payments-services";
import { Request, Response } from "express";
import httpStatus from "http-status";

export async function getPaymentInfo(req: AuthenticatedRequest, res: Response) {
    const userId = req.userId;
    const ticketId = Number(req.query.ticketId);

    if (!ticketId){
      return res.sendStatus(400);
    }
  
  try {

    const paymentInfo = await paymentsService.checkInfoPayment(ticketId, userId);
    return res.status(200).send(paymentInfo);
    
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
  const userId = Number(req.userId);
  const body = req.body;

  if ( !body.ticketId || !body.cardData){
    res.sendStatus(400);
  }
  
  try {

    const paymentInfo = await paymentsService.paymentProcess(body, userId);
    
    if(!paymentInfo){
      throw notFoundError();
    }
    
    return res.status(200).send(paymentInfo);
    
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
