import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import EventEmitter from 'events';
import http from 'http';
import { Server } from 'socket.io';

import logger from './config/logger.config.js';
import { configureEvents } from './controllers/events.controller.js';
import { defaultError404, defaultError500 } from './middleware/default.errors.handler.middleware.js';

export const eventEmitter = new EventEmitter();

export class App {

  constructor() {

    this.port = process.env.PORT || 3000;
    this.app = express();
    this.server = http.createServer(this.app);
    this.io = new Server(this.server);

    //Routes declarations
    this.paths = []

    //WebSocket
    this.websocket();
    //Events Handler
    this.eventsConfig();
    //Middleware's
    this.middleware();
    //Routes
    this.routes();
  }

  eventsConfig() {
    configureEvents();
  }

  middleware() {
    //Disable X-powered-By Header
    this.app.disable('x-powered-by');
    //Cors
    this.app.use(cors());
    //Helmet
    this.app.use(helmet());
    //Json Parser
    this.app.use(express.json());
    //Public directory
    this.app.use(express.static('src/public'));
  }

  routes() {
    this.paths.forEach(async (routeItem) => {
      this.app
      this.app.use(routeItem.path , routeItem.route);
    });
    this.app.use(defaultError404);
    this.app.use(defaultError500);
  }

  websocket() {
    this.io.on('connection', (socket) => {

      eventEmitter.emit('SOCKET_CONNECT', socket);
      
      socket.on('disconnect', () => {
        eventEmitter.emit('SOCKET_DISCONNECT', socket);
      });

      socket.on('SEND_MESSAGE', (request) => {
        const payload = {
          socket: socket,
          request
        }
        eventEmitter.emit('SOCKET_MESSAGE',payload);
      });
    })
  }

  start() {
    this.server.listen(this.port, () => {
      logger.info(`Server listening at http://0.0.0.0:${this.port}`);
    });
  }
}