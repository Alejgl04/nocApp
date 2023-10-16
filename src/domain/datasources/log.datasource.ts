import { LogEntity, LogSeveretyLevel } from '../entities/log.entity';

export abstract class LogDatasource {
  
  abstract saveLog( log: LogSeveretyLevel ): Promise<void>;
  abstract getLogs( severetyLevel: LogSeveretyLevel ): Promise<LogEntity[]>;
  
}