import { LogEntity, LogSeveretyLevel } from "../../domain/entities/log.entity";
import { LogRepositoryImpl } from "./log.repository.impl";


describe('log.repository.impl.test', () => {
  
  const mockLogRepositoryImpl = {
    saveLog: jest.fn(),
    getLogs: jest.fn(),
  }

  const logRepository = new LogRepositoryImpl(mockLogRepositoryImpl);

  beforeEach(() => {
    jest.clearAllMocks();
  })

  test('saveLog should call the datasource with arguments', async() => {
    
    const log = { level: LogSeveretyLevel.low, message: 'test messing'} as LogEntity;

    await logRepository.saveLog(log);
    expect(mockLogRepositoryImpl.saveLog).toHaveBeenCalledWith(log);
  
  });
  test('getlogs should call the datasource with arguments', async() => {
  
    await logRepository.getLogs( LogSeveretyLevel.low );
    expect(mockLogRepositoryImpl.getLogs ).toHaveBeenCalledWith(LogSeveretyLevel.low);

  });

});
