import { notFoundError, unauthorizedError } from "@/errors";
import paymentRepository from "@/repositories/payment-repository";
import ticketRepository from "@/repositories/ticket-repository";
import { PaymentProcess } from "@/schemas";


async function checkInfoPayment(ticketId:number, userId: number) {
    const ticketOfUser = await ticketRepository.findUserTicketByEnrollmentId(userId);

    if(ticketOfUser.id !== ticketId){
        throw unauthorizedError();
        
    }

    if(ticketOfUser.Enrollment.userId ! === userId){
        throw unauthorizedError();
    }

    const ticket = await ticketRepository.findUserTicket(ticketId);

    if(!ticket){
        throw notFoundError();
    }

    return await paymentRepository.findPaymentByTicketId(ticketId);
}

async function paymentProcess(body:PaymentProcess, userId: number) {
    const ticketOfUser = await ticketRepository.findUserTicketByEnrollmentId(userId);

    if(ticketOfUser.id !== body.ticketId){
        throw unauthorizedError();
    }

    if(ticketOfUser.Enrollment.userId ! === userId){
        throw unauthorizedError();
    }

    const ticket = await ticketRepository.findUserTicket(body.ticketId);
    if(!ticket){
        throw notFoundError();
    }
    await ticketRepository.updateTicket(body.ticketId)
    return await paymentRepository.findPaymentByTicketId(body.ticketId)
}

const paymentsService = {
    checkInfoPayment,
    paymentProcess
  };
  
  export default paymentsService;