const socket = io();

socket.on('CURRENT_STATUS', (payload) => {
  payload.forEach((element,index) => {
    printMessage(index+1,element);
  });
});

const printMessage = (index,ticket) => {

  const label = document.querySelector(`#lblTicket${index}`);
  const desktop =  document.querySelector(`#lblEscritorio${index}`);

  label.innerHTML = `Ticket ${ticket.number}`;
  desktop.innerHTML = ticket.desktop;
}