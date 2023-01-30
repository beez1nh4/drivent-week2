import { prisma } from "@/config";

async function findPaymentByTicketId(ticketId: number) {

  return prisma.payment.findFirst({
    where:{
        ticketId
    }
  })
}

async function createPaymentProcess(ticketId:number, value: number, cardIssuer: string, cardLastDigits: string) {
  const Payment = {
    ticketId,
    value,
    cardIssuer,
    cardLastDigits
  }

  return await prisma.payment.create({
    data: Payment
  })
}

const paymentRepository = {
    findPaymentByTicketId,
    createPaymentProcess
}
export default paymentRepository;