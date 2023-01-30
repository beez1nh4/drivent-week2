import { notFoundError } from "@/errors";
import { AuthenticatedRequest } from "@/middlewares";
import enrollmentRepository from "@/repositories/enrollment-repository";
import ticketRepository from "@/repositories/ticket-repository";
import ticketsService from "@/services/tickets-service";
import { Request, Response } from "express";
import httpStatus from "http-status";

export async function getAllTicketsTypes(req: AuthenticatedRequest, res: Response) {
  try {
    const ticketsTypes = await ticketRepository.findTicketsTypes();
    res.send(ticketsTypes)
    
  } catch (error) {
    return res.sendStatus(httpStatus.NO_CONTENT);
  }
}

export async function getUserTicket(req:AuthenticatedRequest, res: Response) {
    try{
        const id = req.userId;
        const ticket = await ticketsService.checkFindTicket(id);

        res.send(ticket);
    }catch (error) {
        return res.sendStatus(httpStatus.NOT_FOUND);
      }
}

export async function postUserTicket(req:AuthenticatedRequest, res: Response) {
    const userId = Number(req.userId);
    const { ticketTypeId } = req.body;
    if (!ticketTypeId || ticketTypeId === undefined){
    return res.sendStatus(400);
    }

    if (!userId){
      res.sendStatus(404);
    }
    
  
  try{
        const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
        if (!enrollment){
          return res.sendStatus(404);
        }

        const ticket = await ticketsService.checkCreateTicket(Number(ticketTypeId), userId);

        if (!ticket){
          throw notFoundError();
        }
        return res.status(201).send(ticket);
    } catch (error) {
        if (error.name === "UnauthorizedError") {
        return res.sendStatus(401);
        }
        if (error.name === "NotFoundError") {
        return res.sendStatus(404);
        }
        return res.sendStatus(httpStatus.NOT_FOUND);
        
      }
}