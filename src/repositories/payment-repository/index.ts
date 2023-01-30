import { prisma } from "@/config";

async function findPaymentByTicketId(ticketId: number) {

  return prisma.payment.findFirst({
    where:{
        ticketId
    }
  })
}

async function createPaymentProcess(paymentData: {ticketId:number, value: number, cardIssuer: string, cardLastDigits: string}) {

  return await prisma.payment.create({
    data: paymentData
  })
}

const paymentRepository = {
    findPaymentByTicketId,
    createPaymentProcess
}
export default paymentRepository;