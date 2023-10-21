import { LogEntity, LogSeveretyLevel } from '../../entities/log.entity';
import { LogRepository } from '../../repository/log.repository';

interface CheckServiceMultipleUseCase {
  execute( url: string ): Promise<boolean>
}

type SuccessCallback = (() => void) | undefined;
type ErrorCallback = (( error: string ) => void) | undefined;

export class CheckServiceMultiple implements CheckServiceMultipleUseCase {

  constructor(
    private readonly logRepository: LogRepository[],
    private readonly successCallback: SuccessCallback,
    private readonly errorCallback: ErrorCallback
  ) {}

  private callAllLogs( log: LogEntity ) {
    this.logRepository.forEach(logRepository => {
      logRepository.saveLog(log)
    });
  } 

  public async execute( url: string ): Promise<boolean> {
    try {
      const request = await fetch( url );

      if( !request.ok ) {
        throw new Error( `Error on check service ${url}` );
      }

      // const log = new LogEntity(`Service ${url} working`, LogSeveretyLevel.low );
      const log = new LogEntity({
        message: `Service ${url} working`,
        level: LogSeveretyLevel.low,
        origin: 'checkservices.ts'
      })

      this.callAllLogs(log);
      this.successCallback && this.successCallback();
      return true;

    } catch (error) {
      const errorMessage = `${url } is not okay. ${error}`;      
      const log = new LogEntity({
        message: `${errorMessage}`,
        level: LogSeveretyLevel.high,
        origin: 'checkservices.ts'
      });

      this.callAllLogs(log);
      this.errorCallback && this.errorCallback(`${errorMessage}`)

      return false;
    }
  } 

}