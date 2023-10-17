import { LogDatasource } from "../../domain/datasources/log.datasource";
import { LogSeveretyLevel, LogEntity } from "../../domain/entities/log.entity";
import { LogRepository } from "../../domain/repository/log.repository";

export class LogRepositoryImpl implements LogRepository {

  constructor(
    private readonly logDataSource: LogDatasource,
  ){}

  async saveLog(log: LogEntity): Promise<void> {

    return this.logDataSource.saveLog(log);
  }
  
  async getLogs(severetyLevel: LogSeveretyLevel): Promise<LogEntity[]> {

    return this.logDataSource.getLogs( severetyLevel );
  }

}