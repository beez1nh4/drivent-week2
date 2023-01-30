import { AuthenticatedRequest } from "@/middlewares";
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
        await ticketsService.checkFindTicket(id);
        const ticket = await ticketRepository.findUserTicket(id);
        res.send(ticket);
    }catch (error) {
        return res.sendStatus(httpStatus.NOT_FOUND);
      }
}

export async function postUserTicket(req:AuthenticatedRequest, res: Response) {
    const userId = req.userId;
    const { ticketTypeId } = req.body;
    if (!ticketTypeId){
    res.sendStatus(httpStatus.BAD_REQUEST);
    }

    if (!userId){
      res.sendStatus(404);
    }
    
  
  try{
        
        const ticket = ticketsService.checkCreateTicket(ticketTypeId, userId);
        
        res.status(201).send(ticket)
    } catch (error) {
        if (error.name === "NotFoundError") {
        return res.sendStatus(404);
        }
        return res.sendStatus(httpStatus.BAD_REQUEST);
        
      }
}