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

    const ticket = await ticketRepository.findTicketById(body.ticketId);
    if(!ticket){
        throw notFoundError();
    }
    if(ticket.Enrollment.userId ! == userId){
        throw unauthorizedError();
    }

    const paymentData = {
        ticketId: body.ticketId,
        value: ticket.TicketType.price,
        cardIssuer: body.cardData.issuer,
        cardLastDigits: body.cardData.number.toString().slice(-4)
    }
    await ticketRepository.updateTicket(body.ticketId);
    const paymentDone = await paymentRepository.createPaymentProcess(paymentData);

    
    return paymentDone;
}

const paymentsService = {
    checkInfoPayment,
    paymentProcess
  };
  
  export default paymentsService;