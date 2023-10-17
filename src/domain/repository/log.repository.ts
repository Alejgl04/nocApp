import { LogEntity, LogSeveretyLevel } from '../entities/log.entity';


/**
 * !!You call from log repository to datasource
 */
export abstract class LogRepository {
  
  abstract saveLog( log: LogEntity ): Promise<void>;
  abstract getLogs( severetyLevel: LogSeveretyLevel ): Promise<LogEntity[]>;
  
}