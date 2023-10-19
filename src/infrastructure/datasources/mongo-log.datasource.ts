import { LogModel } from '../../data/mongoDB';
import { LogDatasource } from '../../domain/datasources/log.datasource';
import { LogEntity, LogSeveretyLevel } from '../../domain/entities/log.entity';

export class MongoLogDatasource implements LogDatasource {

  async saveLog(log: LogEntity): Promise<void> {
    
    const newLog = await LogModel.create(log);
    console.log('mongo log created:', newLog.id);
  }
  
  async getLogs(severetyLevel: LogSeveretyLevel): Promise<LogEntity[]> {

    const logs = await LogModel.find({
      level: severetyLevel
    });

    return logs.map( LogEntity.fromObject );
  }

}