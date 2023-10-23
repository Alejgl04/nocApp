import { LogEntity, LogSeveretyLevel } from '../entities/log.entity';
import { LogDatasource } from './log.datasource';


describe('log.datasource.ts LogDatasource', () => {

  const newLog = new LogEntity({
    origin: 'log.datasource.test.ts',
    message: 'test-message',
    level: LogSeveretyLevel.low
  })

  class MockLogDatasource implements LogDatasource {
    
    async saveLog(log: LogEntity): Promise<void> {
      return; 
    }
    async getLogs(severetyLevel: LogSeveretyLevel): Promise<LogEntity[]> {

      return [newLog];
    }

  }


  test('should test the abstract class', () => {

    const mockLogDatasource = new MockLogDatasource();

    expect(mockLogDatasource).toBeInstanceOf(MockLogDatasource); 
    expect(mockLogDatasource).toHaveProperty( 'saveLog'); 
    expect(mockLogDatasource).toHaveProperty( 'getLogs'); 


  });
});
