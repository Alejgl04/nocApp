import fs from 'fs';
import { LogDatasource } from "../../domain/datasources/log.datasource";
import { LogSeveretyLevel, LogEntity } from "../../domain/entities/log.entity";


export class FileSystemDatasource implements LogDatasource {

  private readonly logPath     = 'logs/';
  private readonly lowLogsPath = 'logs/logs-low.log';
  private readonly mediumLogsPath = 'logs/logs-medium.log';
  private readonly highLogsPath   = 'logs/logs-high.log';

  constructor(){
    this.createLogsFiles();
  }

  private createLogsFiles = () => {
    if ( !fs.existsSync( this.logPath )) {
      fs.mkdirSync( this.logPath );
    }

    [

      this.lowLogsPath,
      this.mediumLogsPath,
      this.highLogsPath
    
    ].forEach( path => {
      if ( fs.existsSync( path )) return;
      fs.writeFileSync( path, '');
    })
  }

  saveLog(log: LogSeveretyLevel): Promise<void> {
    throw new Error("Method not implemented.");
  }
  getLogs(severetyLevel: LogSeveretyLevel): Promise<LogEntity[]> {
    throw new Error("Method not implemented.");
  }

}