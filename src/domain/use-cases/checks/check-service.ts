import { LogEntity, LogSeveretyLevel } from '../../entities/log.entity';
import { LogRepository } from '../../repository/log.repository';

interface CheckServiceUseCase {
  execute( url: string ): Promise<boolean>
}

type SuccessCallback = (() => void) | undefined;
type ErrorCallback = (( error: string ) => void) | undefined;

export class CheckService implements CheckServiceUseCase {

  constructor(
    private readonly logRepository: LogRepository,
    private readonly successCallback: SuccessCallback,
    private readonly errorCallback: ErrorCallback
  ) {}

  public async execute( url: string ): Promise<boolean> {
    try {
      const request = await fetch( url );

      if( !request.ok ) {
        throw new Error( `Error on check service ${url}` );
      }

      const log = new LogEntity(`Service ${url} working`, LogSeveretyLevel.low );
      
      this.logRepository.saveLog( log );
      this.successCallback && this.successCallback();
      return true;

    } catch (error) {

      const errorMessage = `${url } is not okay. ${error}`;      
      const log = new LogEntity(`Service ${errorMessage} working`, LogSeveretyLevel.high );

      this.logRepository.saveLog(log)
      this.errorCallback && this.errorCallback(`${errorMessage}`)

      return false;
    }
  } 

}