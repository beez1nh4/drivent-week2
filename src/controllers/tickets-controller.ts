import ticketRepository from "@/repositories/ticket-repository";
import { Request, Response } from "express";
import httpStatus from "http-status";

export async function getAllTicketsTypes(req: Request, res: Response) {
  try {
    const ticketsTypes = await ticketRepository.findTicketsTypes();
    res.send(ticketsTypes)
    
  } catch (error) {
    return res.sendStatus(httpStatus.NO_CONTENT);
  }
}

export async function getUserTicket(req:Request, res: Response) {
    try{
        const id = res.locals.userId;
        const ticket = await ticketRepository.findUserTicket(id);
        res.send(ticket);
    }catch (error) {
        return res.sendStatus(httpStatus.NO_CONTENT);
      }
}

export async function postUserTicket(req:Request, res: Response) {
    try{
        const userId = res.locals.userId;
        const {ticketTypeId} = req.body;

        await ticketRepository.postTicketForUser(ticketTypeId, userId)
        
        const ticket = await ticketRepository.findUserTicket(userId)
        res.status(201).send(ticket)
    }catch (error) {
        return res.sendStatus(httpStatus.NO_CONTENT);
      }
}