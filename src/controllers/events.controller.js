import logger from '../config/logger.config.js';
import { eventEmitter } from '../app.js';
import { initSocketService, ticketActionReceived } from './tickets.controller.js';

export const configureEvents = () => {
  
  eventEmitter.on('SOCKET_CONNECT',(socket) => {
    logger.debug('event "SOCKET_CONNECT" Captured');
    logger.debug(`User connected ${socket.id}`);
    initSocketService(socket);
  });

  eventEmitter.on('SOCKET_DISCONNECT',(socket) => {
    logger.debug('event "SOCKET_DISCONNECT" Captured');
    logger.debug(`User disconnected ${socket.id}`);
  });

  eventEmitter.on('SOCKET_MESSAGE',(payload) => {
    logger.debug('event "SOCKET_MESSAGE" Captured');
    ticketActionReceived(payload);
  });

}