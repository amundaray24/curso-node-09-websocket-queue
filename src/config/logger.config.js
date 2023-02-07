import { createLogger, format, transports } from 'winston';

const configurationBase = [
  format.errors({ stack: true }),
  format.timestamp({format: 'YYYY-MM-DD|HH:mm:ss:SSS'}),
  format.align(),
  format.printf(info => `${info.level}|${[info.timestamp]}|${info.message}`)
]
const configurationConsole = format.combine(
  format.colorize(),
  ...configurationBase
);

const configurationFile = format.combine(
  ...configurationBase
);

const level = process.env.ENV==='DEV' ? 'debug' : (process.env.ENV==='PRD'? 'error': 'info')

export default createLogger({
  transports : [
    new transports.Console({
      format: configurationConsole,
      level
    }),
    new transports.File({
      filename: `${process.env.LOG_PATH}/WEBSOCKET_QUEUE_SERVER.log`,
      format: configurationFile,
      level
    })
  ]
});