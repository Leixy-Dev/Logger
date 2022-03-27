import { Options } from './types/options';
import momentTimezone from 'moment-timezone';
import moment from 'moment';
import fs from 'fs';
import path from 'path';
import * as types from './types/types';

moment.suppressDeprecationWarnings = true;

/**
 * @name Logger
 * @description A simple logger
 * @author Leixy
 * @version 1.0.0
 * @license GNU-GPLv3
 */

/**
 * @class Logger
 * @description The Logger class
 * @example
 * const logger = new Logger({
 *    loggerName: 'my-logger',
 *    timezone: 'America/Sao_Paulo',
 *    timeFormat: 12,
 *    outDirFile: {
 *       enabled: true,
 *       path: './logs'
 *     },
 *    outDirConsole: {
 *       enabled: true,
 *       colored: true
 *     },
 *    logFormat: 1,
 *    colorType: 'background'
 * });
 */

export class Logger {

  public loggerName: string;
  public timezone: string;
  public timeFormat: number;
  public outDirFile: {
        enabled: boolean,
        path: string
  };
  public outDirConsole: {
        enabled: boolean,
        colored: boolean
  };
  public date: string;
  public logFormat: number;
  private isHour12: boolean;
  public colorType: 'background' | 'font';

  /**
   * All Logger Options
   * @typedef {Object} Options
   * @property {string} loggerName - Name of the logger
   * @property {string} timezone - Timezone of the logger
   * @property {number} timeFormat - Time format of the logger
   * @property {Object} outDirFile - Output directory for file
   * @property {boolean} outDirFile.enabled - Enable output directory for file
   * @property {string} outDirFile.path - Output directory for file
   * @property {Object} outDirConsole - Output directory for console
   * @property {boolean} outDirConsole.enabled - Enable output directory for console
   * @property {boolean} outDirConsole.colored - Enable colored output for console
   * @property {number} logFormat - Log format
   * @property {string} colorType - Color type
   */

  /**
   * @constructor
   * @param {Options} options - Options for logger
   */

  constructor(options: Options) {
    this.loggerName = options.loggerName;
    this.timezone = options.timezone;
    this.timeFormat = options.timeFormat;
    this.outDirFile = options.outDirFile;
    this.outDirConsole = options.outDirConsole;
    this.logFormat = options.logFormat;
    this.colorType = options.colorType;

    // Check if all required options are set
    if (!this.loggerName) {
      throw new TypeError('Logger name is not set');
    }
    if (!this.timezone) {
      throw new TypeError('Timezone is not set');
    }
    if (!this.timeFormat) {
      throw new TypeError('Time format is not set');
    }
    if (!this.outDirFile) {
      throw new TypeError('Output directory is not set');
    }
    if (!this.outDirConsole) {
      throw new TypeError('Output directory is not set');
    }

    if (!this.logFormat) {
      throw new TypeError('Log format is not set');
    }

    if (!this.colorType) {
      throw new TypeError('Color type is not set');
    }

    if (!this.isValidTimezone(this.timezone)) {
      throw new TypeError(`Invalid timezone: ${this.timezone}`);
    }

    if (this.timeFormat === 12) { this.isHour12 = true; } else { this.isHour12 = false; }

    const date = new Date().toLocaleString('en-US', { timeZone: this.timezone, hour12: this.isHour12, timeZoneName: 'short' });
    this.date = this.formatTime(date);
  }

  /**
   * @function info
   * @param {string} message - Message to log
   */

  public info(message: string): void {
    const logs = this.generateLog(message, 'INFO', types.INFO);
    if (this.outDirFile.enabled) {
      this.writeToFile(logs[0]);
    }
    if (this.outDirConsole.enabled) {
      if (this.outDirConsole.colored) {
        console.log(logs[1]);
      } else {
        console.log(logs[0]);
      }
    }
  }

  /**
   * @function warn
   * @param {string} message - Message to log
   */

  public warn(message: string): void {
    const logs = this.generateLog(message, 'WARN', types.WARN);
    if (this.outDirFile.enabled) {
      this.writeToFile(logs[0]);
    }
    if (this.outDirConsole.enabled) {
      if (this.outDirConsole.colored) {
        console.log(logs[1]);
      } else {
        console.log(logs[0]);
      }
    }
  }

  /**
   * @function error
   * @param {string} message - Message to log
   */

  public error(message: string): void {
    const logs = this.generateLog(message, 'ERROR', types.ERROR);
    if (this.outDirFile.enabled) {
      this.writeToFile(logs[0]);
    }
    if (this.outDirConsole.enabled) {
      if (this.outDirConsole.colored) {
        console.log(logs[1]);
      } else {
        console.log(logs[0]);
      }
    }
  }

  /**
   * @function debug
   * @param {string} message - Message to log
   */

  public debug(message: string): void {
    const logs = this.generateLog(message, 'DEBUG', types.DEBUG);
    if (this.outDirFile.enabled) {
      this.writeToFile(logs[0]);
    }
    if (this.outDirConsole.enabled) {
      if (this.outDirConsole.colored) {
        console.log(logs[1]);
      } else {
        console.log(logs[0]);
      }
    }
  }

  /**
   * @function generateLog
   * @private
   * @param {string} message - Message to log
   * @param {string} level - Level of log
   * @param {string} type - Type of log
   * @returns {string[]} - Array with log and colored log
   */

  private generateLog(message: string, level: string, type: types.type) {
    const logs: Array<string> = [];
    if (this.colorType === 'background') {
      switch (this.logFormat) {
      case 1:
        logs.push(`[${this.date}] [${level.toUpperCase()}] - ${this.loggerName} : ${message}`);
        logs.push(`${types.DATE.backgroundColor(`[ ${this.date} ]`)}${type.backgroundColor([' ' + level.toUpperCase() + ' '])}${type.backgroundColor(`- ${this.loggerName} : `)}${type.fontColor(` ${message}`)}`);
        break;
      case 2:
        logs.push(`${level.toUpperCase()} [${this.date}] | ${this.loggerName} - ${message}`);
        logs.push(`${type.backgroundColor([' ' + level.toUpperCase() + ' '])}${types.DATE.backgroundColor(`[ ${this.date} ]`)}${type.backgroundColor(` | ${this.loggerName} - `)}${type.fontColor(` ${message}`)}`);
        break;
      }
    } else if (this.colorType === 'font') {
      switch (this.logFormat) {
      case 1:
        logs.push(`[${this.date}] [${level.toUpperCase()}] - ${this.loggerName} : ${message}`);
        logs.push(`${types.DATE.fontColor(`[ ${this.date} ]`)}${type.fontColor([' ' + level.toUpperCase() + ' '])}${types.DATE.fontColor('- ')}${type.fontColor(`${this.loggerName} `)}${types.DATE.fontColor(': ')}${type.fontColor(`${message}`)}`);
        break;
      case 2:
        logs.push(`${level.toUpperCase()} [${this.date}] | ${this.loggerName} - ${message}`);
        logs.push(`${type.fontColor(' ' + level.toUpperCase() + ' ')}${types.DATE.fontColor(`[ ${this.date} ]`)}${types.DATE.fontColor(' |')}${type.fontColor(` ${this.loggerName} `)}${types.DATE.fontColor('- ')}${type.fontColor(`${message}`)}`);
        break;
      }
    }
    
    return logs;
  }

  /**
   * Check if timezone is valid
   * @param {string} timezone - Timezone to check
   * @returns {boolean} - True if timezone is valid
   * @private
   * @memberof Logger
   * @method isValidTimezone
   * @static
   * @example
   * Logger.isValidTimezone('Europe/Berlin');
   * -> true
   * Logger.isValidTimezone('Europe/Berlin/');
   * -> false
   **/
  
  private isValidTimezone(timezone: string): boolean {
    return momentTimezone.tz.zone(timezone) != null;
  }

  /**
   * Format time
   * @param {string} date - Date to format
   * @returns {string} - Formatted date
   * @private
   * @memberof Logger
   * @method formatTime
   * @static
   * @example
   * Logger.formatTime('2019-01-01T00:00:00.000Z');
   * -> '01.01.2019 00:00:00'
   **/

  private formatTime(time: string): string {
    return momentTimezone(time).format('HH:mm:ss.SSS');
  }

  /**
   * Write to file
   * @param {string} log - Message to write in the file
   * @private
   **/

  private writeToFile(log: string): void {
    const folder = this.outDirFile.path;
    if (!fs.existsSync(folder)) {
      fs.mkdirSync(folder);
    }
    fs.appendFile(path.join(folder, `${this.loggerName}.log`), log + '\n', (err) => {
      if (err) {
        throw err;
      }
    });
  }
}

export default Logger;