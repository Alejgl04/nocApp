import { LogDatasource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSeveretyLevel } from "../../domain/entities/log.entity";
import { PrismaClient, SeverityLevel } from '@prisma/client';

const prismaClient = new PrismaClient();
const severityEnum = {
  low: SeverityLevel.LOW,
  medium: SeverityLevel.MEDIUM,
  high: SeverityLevel.HIGH,
}

export class PostgresLogDatasource implements LogDatasource {

  async saveLog(log: LogEntity): Promise<void> {

    const level = severityEnum[log.level];
    const newLog = await prismaClient.logModel.create({
      data: {
        ...log,
        level
      }
    })
    console.log('Postgres save');
  }
  
  async getLogs(severetyLevel: LogSeveretyLevel): Promise<LogEntity[]> {

    const level = severityEnum[severetyLevel];

    const dbLogs = await prismaClient.logModel.findMany({
      where: { level }
    });

    return dbLogs.map( dbLog => LogEntity.fromObject(dbLog));
  }

}