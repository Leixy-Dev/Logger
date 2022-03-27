"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DATE = exports.DEBUG = exports.WARN = exports.ERROR = exports.INFO = void 0;
const chalk_1 = __importDefault(require("chalk"));
exports.INFO = {
    fontColor: chalk_1.default.rgb(65, 198, 50),
    backgroundColor: chalk_1.default.bgRgb(65, 198, 50).white.bold,
    name: 'info',
    text: 'INFORMATION'
};
exports.ERROR = {
    fontColor: chalk_1.default.rgb(255, 50, 50),
    backgroundColor: chalk_1.default.bgRgb(255, 50, 50).white.bold,
    name: 'info',
    text: 'INFORMATION'
};
exports.WARN = {
    fontColor: chalk_1.default.rgb(255, 254, 50),
    backgroundColor: chalk_1.default.bgRgb(255, 131, 50).white.bold,
    name: 'info',
    text: 'INFORMATION'
};
exports.DEBUG = {
    fontColor: chalk_1.default.rgb(64, 81, 255),
    backgroundColor: chalk_1.default.bgRgb(64, 81, 255).white.bold,
    name: 'info',
    text: 'INFORMATION'
};
exports.DATE = {
    fontColor: chalk_1.default.rgb(95, 113, 131),
    backgroundColor: chalk_1.default.bgRgb(44, 62, 80).white.bold,
    name: 'date',
    text: 'DATE'
};
// blue: 64, 81, 255
