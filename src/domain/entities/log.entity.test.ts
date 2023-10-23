import { LogEntity, LogSeveretyLevel } from "./log.entity";


describe('log.entity.test', () => {
  const dataObj = {
    message: 'Test message log',
    level: LogSeveretyLevel.low,
    origin: 'log.entity.test'
  }

  test('should create a log entity instance', () => {
    
    const log = new LogEntity(dataObj);

    expect( log ).toBeInstanceOf( LogEntity );
    expect( log.message ).toBe( dataObj.message );
    expect( log.level ).toBe( dataObj.level );
    expect( log.origin ).toBe( dataObj.origin );
    expect( log.createdAt ).toBeInstanceOf( Date );
  
  });

  test('should create a logEntity instance from json', () => {

    const json = `{"message":"Service https://google.com working","level":"low","createdAt":"2023-10-21T09:59:45.273Z","origin":"checkservices.ts"}`;

    const log = LogEntity.fromJson(json);

    expect( log ).toBeInstanceOf( LogEntity );
    expect( log.message ).toBe( "Service https://google.com working" );
    expect( log.level ).toBe(LogSeveretyLevel.low);
    expect( log.origin ).toBe( "checkservices.ts" );
    expect( log.createdAt ).toBeInstanceOf( Date );

  });

  test('should create a logEntity instance from object', () => {

    const log = LogEntity.fromObject(dataObj);

    expect( log ).toBeInstanceOf( LogEntity );
    expect( log.message ).toBe( "Service https://google.com working" );
    expect( log.level ).toBe(LogSeveretyLevel.low);
    expect( log.origin ).toBe( "checkservices.ts" );
    expect( log.createdAt ).toBeInstanceOf( Date );

  });



});
