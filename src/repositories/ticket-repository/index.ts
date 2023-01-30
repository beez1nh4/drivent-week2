import { prisma } from "@/config";
import { TicketStatus } from "@prisma/client";


async function findTicketsTypes() {

  return prisma.ticketType.findMany()
}

async function findUserTicket(id: number) {
    
    return prisma.ticket.findFirst({
        where:{
            id
        },
        select:{
            id: true,
            status: true,
            ticketTypeId: true,
            enrollmentId: true,
            TicketType:{
                select:{
                    id: true,
                    name: true,
                    price: true,
                    isRemote: true,
                    includesHotel: true,
                    createdAt: true,
                    updatedAt: true
                }
            },
            createdAt: true,
            updatedAt: true
        }
    })
}

async function postTicketForUser(ticketTypeId:number, userId: number) {
    const enrollment = await prisma.enrollment.findFirst({
        where:{
            userId
        }
    })
    await prisma.ticket.create({
        data:{
            ticketTypeId,
            enrollmentId: enrollment.id,
            status: TicketStatus.RESERVED
        }
    })
}

const ticketRepository = {
    findTicketsTypes,
    findUserTicket,
    postTicketForUser
};

export default ticketRepository;
