export type TicketType = {
    id: number,
    status: string, //RESERVED | PAID
    ticketTypeId: number,
    enrollmentId: number,
    TicketType: {
      id: number,
      name: string,
      price: number,
      isRemote: boolean,
      includesHotel: boolean,
      createdAt: Date,
      updatedAt: Date,
    },
    createdAt: Date,
    updatedAt: Date,
  }

export type TicketInputType = {
    status: string, //RESERVED | PAID
    ticketTypeId: number,
    enrollmentId: number
}