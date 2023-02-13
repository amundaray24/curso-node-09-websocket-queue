const lblOnline  = document.querySelector('#lblOnline');
const lblOffline = document.querySelector('#lblOffline');
const txtMessage = document.querySelector('#txtMessage');
const btnSend    = document.querySelector('#btnSend');

const socket = io();

socket.on('connect', () => {
  lblOnline.style.display = '';
  lblOffline.style.display = 'none';
});

socket.on('disconnect', () => {
  lblOnline.style.display = 'none';
  lblOffline.style.display = '';
});

socket.on('SEND_MESSAGE', (payload) => {
  console.log(payload);
});

btnSend.addEventListener('click', () => {
  const message = txtMessage.value;
  txtMessage.value = '';
  const payload = {
    message,
    date: new Date().toISOString()
  }
  socket.emit('SEND_MESSAGE',payload);
});