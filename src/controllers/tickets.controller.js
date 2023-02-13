import { TicketsRepository } from "../repositories/tickets.repository.js";

const ticketsRepository = new TicketsRepository();

export const initSocketService = (socket) => {
  socket.broadcast.emit('CURRENT_QUEUE',ticketsRepository.tickets.length);
  socket.emit('CURRENT_QUEUE',ticketsRepository.tickets.length);
  socket.emit('LAST_TICKET',ticketsRepository.last);
  socket.emit('CURRENT_STATUS',ticketsRepository.lastTickets);
}

export const ticketActionReceived = (payload) => {
  const {socket,request} = payload;

  switch (request.action) {
    case 'NEW_TICKET':
      _generateNewTicket(socket);
      break;
    case 'ATTEND_TICKET':
      _attendTicket(socket,request);
      break;
  
    default:
      socket.emit('INVALID_ARGUMENTS');
      break;
  }
}

const _generateNewTicket = (socket) => {
  const nextTicket = ticketsRepository.nextTicket();
  socket.emit('NEW_TICKET',nextTicket);
  socket.broadcast.emit('CURRENT_QUEUE',ticketsRepository.tickets.length);
}

const _attendTicket = (socket,request) => {
  const {desktop} = request;
  if (!desktop) {
    socket.emit('ATTEND_TICKET',{
      status: false,
      message: 'Invalid Desktop'
    });
  }
  const ticket = ticketsRepository.attendTicket(desktop);
  if (!ticket) {
    socket.emit('ATTEND_TICKET',{
      status: false,
      message: 'Not tickets pending'
    });
  } else {
    socket.broadcast.emit('CURRENT_STATUS',ticketsRepository.lastTickets);
    socket.broadcast.emit('CURRENT_QUEUE',ticketsRepository.tickets.length);
    socket.emit('CURRENT_QUEUE',ticketsRepository.tickets.length);
    socket.emit('ATTEND_TICKET',{
      status: true,
      ticket: ticket
    });
  }

}