import { Options } from './types/options';
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
export declare class Logger {
    loggerName: string;
    timezone: string;
    timeFormat: number;
    outDirFile: {
        enabled: boolean;
        path: string;
    };
    outDirConsole: {
        enabled: boolean;
        colored: boolean;
    };
    date: string;
    logFormat: number;
    private isHour12;
    colorType: 'background' | 'font';
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
    constructor(options: Options);
    /**
     * @function info
     * @param {string} message - Message to log
     */
    info(message: string): void;
    /**
     * @function warn
     * @param {string} message - Message to log
     */
    warn(message: string): void;
    /**
     * @function error
     * @param {string} message - Message to log
     */
    error(message: string): void;
    /**
     * @function debug
     * @param {string} message - Message to log
     */
    debug(message: string): void;
    /**
     * @function generateLog
     * @private
     * @param {string} message - Message to log
     * @param {string} level - Level of log
     * @param {string} type - Type of log
     * @returns {string[]} - Array with log and colored log
     */
    private generateLog;
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
    private isValidTimezone;
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
    private formatTime;
    /**
     * Write to file
     * @param {string} log - Message to write in the file
     * @private
     **/
    private writeToFile;
}
export default Logger;
