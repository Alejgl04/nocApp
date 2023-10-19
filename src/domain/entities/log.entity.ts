
export enum LogSeveretyLevel {
  low    = 'low',
  medium = 'medium',
  high   =  'high'
}

export interface LogEntityOptions {
  level: LogSeveretyLevel; //enum
  message: string;
  origin: string;
  createdAt?: Date;
}

export class LogEntity {

  public level: LogSeveretyLevel; //enum
  public message: string;
  public createdAt: Date;
  public origin: string;

  constructor( options: LogEntityOptions ){
    const { message, level, origin, createdAt = new Date() } = options;
    this.message = message;
    this.level   = level;
    this.createdAt = createdAt;
    this.origin  = origin;
  }

  static fromJson = ( json:string ): LogEntity => {
    
    const {message, level, createdAt } = JSON.parse( json );
    const log = new LogEntity({
      message,
      level,
      createdAt,
      origin
    });
    log.createdAt = new Date(createdAt);
    return log; 
  }

  static fromObject = ( object: { [key:string]: any } ): LogEntity => {

    const { message, level, createdAt, origin } = object;
    const log = new LogEntity({
      message, level, createdAt, origin
    })

    return log;
  }

}