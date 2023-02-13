const lblDesktop  = document.querySelector('h1');
const button = document.querySelector('button');
const lblSmall  = document.querySelector('small');
const alert  = document.querySelector('.alert');
const queue = document.querySelector('#lblPendientes');

const searchParams = new URLSearchParams(window.location.search);

if (!searchParams.has('desktop')) {
  window.location = 'index.html';
  throw new Error('Desktop Required');
}

const desktop = searchParams.get('desktop');
lblDesktop.innerHTML = desktop;
alert.style.display = 'none';

const socket = io();

socket.on('connect', () => {
  button.disabled =false;
});

socket.on('disconnect', () => {
  button.disabled =true;
});

socket.on('ATTEND_TICKET', (response) => {
  const {status, message, ticket} = response;
  if (!status) {
    alert.innerHTML = message;
    alert.style.display = '';
    lblSmall.innerHTML = '...';
  } else {
    alert.style.display = 'none';
    lblSmall.innerHTML = `Ticket ${ticket.number}`;
  }
});

socket.on('CURRENT_QUEUE', (tickets) => {
  queue.innerHTML = tickets;
});

button.addEventListener('click', () => {
  const payload = {
    action: 'ATTEND_TICKET',
    desktop: desktop
  }
  socket.emit('SEND_MESSAGE',payload);
});