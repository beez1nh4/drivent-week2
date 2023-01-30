import { prisma } from "@/config";

async function findPaymentByTicketId(ticketId: number) {

  return await prisma.payment.findFirst({
    where:{
        ticketId
    }
  })
}

async function createPaymentProcess(paymentData: {ticketId:number, value: number, cardIssuer: string, cardLastDigits: string}) {

  return await prisma.payment.create({
    data: paymentData,
    select:{
      id: true,
      ticketId: true,
      value: true,
      cardIssuer: true,
      cardLastDigits: true,
      createdAt: true,
      updatedAt: true
    }
  })
}

const paymentRepository = {
    findPaymentByTicketId,
    createPaymentProcess
}
export default paymentRepository;