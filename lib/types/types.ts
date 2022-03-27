import chalk from 'chalk';

export interface type {
    fontColor: chalk.Chalk
    backgroundColor: chalk.Chalk
    name: string
    text: string
}

export const INFO: type = {
  fontColor: chalk.rgb( 65,	198, 50 ),
  backgroundColor: chalk.bgRgb( 65, 198, 50 ).white.bold,
  name: 'info',
  text: 'INFORMATION'
};

export const ERROR: type = {
  fontColor: chalk.rgb( 255, 50, 50 ),
  backgroundColor: chalk.bgRgb( 255, 50, 50 ).white.bold,
  name: 'info',
  text: 'INFORMATION'
};

export const WARN: type = {
  fontColor: chalk.rgb( 255, 254, 50 ),
  backgroundColor: chalk.bgRgb( 255, 131, 50 ).white.bold,
  name: 'info',
  text: 'INFORMATION'
};

export const DEBUG: type = {
  fontColor: chalk.rgb( 64, 81, 255 ),
  backgroundColor: chalk.bgRgb( 64, 81, 255 ).white.bold,
  name: 'info',
  text: 'INFORMATION'
};

export const DATE: type = {
  fontColor: chalk.rgb(95,  113,  131),
  backgroundColor: chalk.bgRgb(44, 62, 80).white.bold,
  name: 'date',
  text: 'DATE'
    
};

// blue: 64, 81, 255