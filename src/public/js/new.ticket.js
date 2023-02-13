const labelNewTicket  = document.querySelector('#lblNuevoTicket');
const button = document.querySelector('button');


const socket = io();

socket.on('connect', () => {
  button.disabled =false;
});

socket.on('disconnect', () => {
  button.disabled =true;
});

socket.on('NEW_TICKET', (ticket) => {
  labelNewTicket.innerHTML = `Ticket: ${ticket}`;
});

socket.on('LAST_TICKET', (ticket) => {
  labelNewTicket.innerHTML = `Ticket: ${ticket}`;
});

button.addEventListener('click', () => {
  const payload = {
    action: 'NEW_TICKET'
  }
  socket.emit('SEND_MESSAGE',payload);
});