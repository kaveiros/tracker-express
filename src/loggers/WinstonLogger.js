const cfg = require('../cfg/configDB')
const {createLogger, transports, format} = require('winston')
require('winston-mongodb')

const logger =  createLogger({
    transports: [new transports.Console({
        level: 'info',
        format: format.combine(format.timestamp(), format.simple(), format.colorize())
    }),
        new transports.MongoDB({
            tryReconnect: true,
            level:'error',
            db:cfg.dbUrl,
            options: { useUnifiedTopology: true }
        })

    ]})


module.exports = logger
