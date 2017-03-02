/* global process:true, __dirname:true */

'use strict';

var fs     = require('fs'),
    path   = require('path'),
    bunyan = require('bunyan');

exports.createLogger = createLogger;

/*
 * configure and start logging
 * @param {Object} settings The configuration object for defining dir: log
 * directory, level: loglevel
 * @return the created logger instance
 */
function createLogger (settings) {

  var pkg = require(path.join(__dirname, 'package')),
      appName = pkg.name,
      appVersion = pkg.version,
      logDir = settings.dir || path.join(__dirname, 'logs'),
      logFile = path.join(logDir, appName + '-log.json'),
      logErrorFile = path.join(logDir, appName + '-errors.json'),
      logLevel = settings.level || 'debug';

  // Create log directory if it doesnt exist
  if (!fs.existsSync(logDir)) fs.mkdirSync(logDir);

  var FluentLogger = require('fluent-logger-stream');

  var fluentLogger = new FluentLogger({tag: 'info', type: 'forward', host: 'localhost', port: 24224}); //in_forward
  
  // Log to console and log file
  var log = bunyan.createLogger({
    name: appName,
    streams: [ 
      {
        stream: fluentLogger,
        level: 'warn'
      },
      { 
        stream: fluentLogger,
        //path: logFile,
        level: logLevel,
        //type: 'rotating-file',
        period: '1d'
      },
      { 
        stream: fluentLogger,
        //path: logErrorFile,
        level: 'error'
      }
    ],
    serializers: bunyan.stdSerializers
    //stream: fluentLogger
  });

  log.info('Starting ' + appName + ', version ' + appVersion);
  log.info('Environment set to ' + process.env.NODE_ENV);
  log.debug('Logging setup completed.'); 
  
  return log;
}
