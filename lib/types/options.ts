export interface Options {
    loggerName: string,
    timezone: string,
    timeFormat: number,
    outDirFile: {
        enabled: boolean,
        path: string
    },
    outDirConsole: {
        enabled: boolean,
        colored: boolean
    },
    logFormat: number,
    colorType: 'background' | 'font'
}   