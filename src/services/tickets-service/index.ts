import { notFoundError } from "@/errors";
import enrollmentRepository from "@/repositories/enrollment-repository";
import ticketRepository from "@/repositories/ticket-repository";

async function checkFindTicket(id: number) {
  const enrollment = await enrollmentRepository.findWithAddressByUserId(id);

  if(!enrollment) {
    throw notFoundError();
  }

  const ticket = await ticketRepository.findUserTicket(enrollment.id);

  if(!ticket) {
    throw notFoundError();
  }
  return ticket;
}

async function checkCreateTicket(ticketTypeId: number, userId: number) {
  const enrollment = await enrollmentRepository.getEnrollmentByUserId(userId);

  if(!enrollment) {
    throw notFoundError();
  }

  return await ticketRepository.postTicketForUser(ticketTypeId, enrollment.id);
}

async function findTicketBasedOnUserId(userId: number) {
  const enrollment = await enrollmentRepository.getEnrollmentByUserId(userId);

  return await ticketRepository.findUserTicketByEnrollmentId(enrollment.id);
}

async function getAllTypes() {
  return await ticketRepository.findTicketsTypes();
}

const ticketsService = {
  checkFindTicket,
  checkCreateTicket,
  findTicketBasedOnUserId,
  getAllTypes
};
  
export default ticketsService;
  
