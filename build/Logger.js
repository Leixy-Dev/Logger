"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = void 0;
const moment_timezone_1 = __importDefault(require("moment-timezone"));
const moment_1 = __importDefault(require("moment"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const types = __importStar(require("./types/types"));
moment_1.default.suppressDeprecationWarnings = true;
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
class Logger {
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
    constructor(options) {
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
        if (this.timeFormat === 12) {
            this.isHour12 = true;
        }
        else {
            this.isHour12 = false;
        }
        const date = new Date().toLocaleString('en-US', { timeZone: this.timezone, hour12: this.isHour12, timeZoneName: 'short' });
        this.date = this.formatTime(date);
    }
    /**
     * @function info
     * @param {string} message - Message to log
     */
    info(message) {
        const logs = this.generateLog(message, 'INFO', types.INFO);
        if (this.outDirFile.enabled) {
            this.writeToFile(logs[0]);
        }
        if (this.outDirConsole.enabled) {
            if (this.outDirConsole.colored) {
                console.log(logs[1]);
            }
            else {
                console.log(logs[0]);
            }
        }
    }
    /**
     * @function warn
     * @param {string} message - Message to log
     */
    warn(message) {
        const logs = this.generateLog(message, 'WARN', types.WARN);
        if (this.outDirFile.enabled) {
            this.writeToFile(logs[0]);
        }
        if (this.outDirConsole.enabled) {
            if (this.outDirConsole.colored) {
                console.log(logs[1]);
            }
            else {
                console.log(logs[0]);
            }
        }
    }
    /**
     * @function error
     * @param {string} message - Message to log
     */
    error(message) {
        const logs = this.generateLog(message, 'ERROR', types.ERROR);
        if (this.outDirFile.enabled) {
            this.writeToFile(logs[0]);
        }
        if (this.outDirConsole.enabled) {
            if (this.outDirConsole.colored) {
                console.log(logs[1]);
            }
            else {
                console.log(logs[0]);
            }
        }
    }
    /**
     * @function debug
     * @param {string} message - Message to log
     */
    debug(message) {
        const logs = this.generateLog(message, 'DEBUG', types.DEBUG);
        if (this.outDirFile.enabled) {
            this.writeToFile(logs[0]);
        }
        if (this.outDirConsole.enabled) {
            if (this.outDirConsole.colored) {
                console.log(logs[1]);
            }
            else {
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
    generateLog(message, level, type) {
        const logs = [];
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
        }
        else if (this.colorType === 'font') {
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
    isValidTimezone(timezone) {
        return moment_timezone_1.default.tz.zone(timezone) != null;
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
    formatTime(time) {
        return (0, moment_timezone_1.default)(time).format('HH:mm:ss.SSS');
    }
    /**
     * Write to file
     * @param {string} log - Message to write in the file
     * @private
     **/
    writeToFile(log) {
        const folder = this.outDirFile.path;
        if (!fs_1.default.existsSync(folder)) {
            fs_1.default.mkdirSync(folder);
        }
        fs_1.default.appendFile(path_1.default.join(folder, `${this.loggerName}.log`), log + '\n', (err) => {
            if (err) {
                throw err;
            }
        });
    }
}
exports.Logger = Logger;
exports.default = Logger;
