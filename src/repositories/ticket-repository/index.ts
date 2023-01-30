import { prisma } from "@/config";
import { TicketInputType } from "@/schemas";
import { TicketStatus } from "@prisma/client";


async function findTicketsTypes() {

  return prisma.ticketType.findMany()
}

async function findUserTicket(enrollmentId: number) {
    
    return prisma.ticket.findFirst({
        where:{
            enrollmentId
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

async function postTicketForUser(ticketTypeId:number, enrollmentId: number) {
    const TicketInput = {
        ticketTypeId,
        enrollmentId,
        status: TicketStatus.RESERVED
    }
    
    return await prisma.ticket.create({
        data: TicketInput,
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

async function findUserTicketByEnrollmentId(enrollmentId: number) {
    
    return prisma.ticket.findFirst({
        where:{
            enrollmentId
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
                },      
            },
            Enrollment: {
                select:{
                    userId: true
                }
            },
            createdAt: true,
            updatedAt: true
        }
    })
}

async function findTicketById(id:number) {
    return prisma.ticket.findUnique({
        where:{
            id
        },
        include:{
            Enrollment: true,
            TicketType: true
        }
    })
}

async function updateTicket(id: number) {
    await prisma.ticket.update({
        where:{
            id
        },
        data:{
            status: TicketStatus.PAID
        }
    })
}


const ticketRepository = {
    findTicketsTypes,
    findUserTicket,
    postTicketForUser,
    findUserTicketByEnrollmentId,
    updateTicket,
    findTicketById
};

export default ticketRepository;
