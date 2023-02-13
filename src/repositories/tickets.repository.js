import path from 'path';
import * as fs from 'fs';

import logger from '../config/logger.config.js';
import data from '../../database/data.json' assert {type:"json"}

const databasePath = path.join(process.env.DATABASE_TMP_PATH,'data.json');

class Ticket {
  constructor(number,desktop) {
    this.number = number;
    this.desktop = desktop;
  }
}

export class TicketsRepository {

  constructor() {
    this.last = 0;
    this.today =  new Date().getDate();
    this.tickets = [];
    this.lastTickets = [];
    this.init();
  }

  get toJson() {
    return {
      last : this.last,
      today : this.today,
      tickets : this.tickets,
      lastTickets : this.lastTickets
    }
  }

  init() {
    const {last, today, tickets, lastTickets} = data;
    if (today === this.today) {
      this.last = last;
      this.tickets = tickets;
      this.lastTickets = lastTickets;
    } else {
      this.saveDatabase();
    }
  }

  saveDatabase() {
    logger.debug(`SAVING DATABASE ${this.toJson}`);
    fs.writeFileSync(databasePath,JSON.stringify(this.toJson));
  }

  nextTicket() {
    this.last++;
    this.tickets.push(new Ticket(this.last,null));
    this.saveDatabase();
    return this.last;
  }

  attendTicket(desktop) {
    if (this.tickets.length === 0) {
      return null;
    }
    const ticket = this.tickets.shift();
    ticket.desktop = desktop;
    this.lastTickets.unshift(ticket);

    if (this.lastTickets.length>4) {
      this.lastTickets.pop();
    }

    this.saveDatabase();
    return ticket;
  }

}