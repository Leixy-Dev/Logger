import chalk from 'chalk';
export interface type {
    fontColor: chalk.Chalk;
    backgroundColor: chalk.Chalk;
    name: string;
    text: string;
}
export declare const INFO: type;
export declare const ERROR: type;
export declare const WARN: type;
export declare const DEBUG: type;
export declare const DATE: type;
