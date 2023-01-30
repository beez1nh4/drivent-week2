import { notFoundError } from "@/errors";
import enrollmentRepository from "@/repositories/enrollment-repository";
import ticketRepository from "@/repositories/ticket-repository";

async function checkFindTicket(id:number) {
    const enrollment = await enrollmentRepository.findWithAddressByUserId(id);

    if(!enrollment){
        throw notFoundError();
    }

    const ticket = await ticketRepository.findUserTicket(id);

    if(!ticket){
        throw notFoundError();
    }
    
}

async function checkCreateTicket(ticketTypeId:number, userId: number) {
    const enrollment = await enrollmentRepository.getEnrollmentByUserId(userId);

    if(!enrollment){
        throw notFoundError();
    }
    await ticketRepository.postTicketForUser(ticketTypeId, enrollment.id);
        
    return await findTicketBasedOnUserId(userId);

}

async function findTicketBasedOnUserId(userId: number){
    const enrollment = await enrollmentRepository.getEnrollmentByUserId(userId);

    return await ticketRepository.findUserTicketByEnrollmentId(enrollment.id)
}

const ticketsService = {
    checkFindTicket,
    checkCreateTicket,
    findTicketBasedOnUserId
  };
  
  export default ticketsService;
  