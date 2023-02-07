import logger from '../config/logger.config.js';
import { eventEmitter } from '../app.js';

export const configureEvents = () => {
  
  eventEmitter.on('SOCKET_CONNECT',(socket) => {
    logger.debug('event "SOCKET_CONNECT" Captured');
    logger.debug(`User connected ${socket.id}`);
  });

  eventEmitter.on('SOCKET_DISCONNECT',(socket) => {
    logger.debug('event "SOCKET_DISCONNECT" Captured');
    logger.debug(`User disconnected ${socket.id}`);
  });

  eventEmitter.on('SOCKET_MESSAGE',(payload) => {
    logger.debug('event "SOCKET_MESSAGE" Captured');

    const { socket, request } = payload

    logger.info(`Request: ${request} socket: ${socket.id}`);
    
  });

}