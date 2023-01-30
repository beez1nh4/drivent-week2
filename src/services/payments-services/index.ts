import { notFoundError, unauthorizedError } from "@/errors";
import paymentRepository from "@/repositories/payment-repository";
import ticketRepository from "@/repositories/ticket-repository";
import { PaymentInformation, PaymentProcess } from "@/schemas";


async function checkInfoPayment(ticketId:number, userId: number) {
    
    const ticket = await ticketRepository.findTicketById(ticketId);

    if(!ticket){
        throw notFoundError();
    }

    if(ticket.Enrollment.userId !== userId){
        throw unauthorizedError();
    }

    return await paymentRepository.findPaymentByTicketId(ticketId);
}

async function paymentProcess(body:PaymentProcess, userId: number): Promise<PaymentInformation> {

    const ticket = await ticketRepository.findTicketById(body.ticketId);
    if(!ticket){
        throw notFoundError();
    }
    if(ticket.Enrollment.userId !== userId){
        throw unauthorizedError();
    }

    const paymentData = {
        ticketId: body.ticketId,
        value: ticket.TicketType.price,
        cardIssuer: body.cardData.issuer,
        cardLastDigits: body.cardData.number.toString().slice(-4)
    };
    
    await ticketRepository.updateTicket(body.ticketId);

    const paymentDone = await paymentRepository.createPaymentProcess(paymentData);

    if(!paymentDone){
        throw notFoundError();
    }
    
    return paymentDone;
}

const paymentsService = {
    checkInfoPayment,
    paymentProcess
  };
  
  export default paymentsService;