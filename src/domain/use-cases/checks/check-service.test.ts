import { LogEntity } from "../../entities/log.entity";
import { CheckService } from "./check-service";


describe('checkService Test', () => {
  
  const mockRepository = {
    saveLog: jest.fn(),
    getLogs: jest.fn(),
  }

  const successCallback = jest.fn();
  const errorCallback = jest.fn();

  const checkService = new CheckService(
    mockRepository,
    successCallback,
    errorCallback
  );

  beforeEach(() => {
    jest.clearAllMocks();
  })

  test('should call successCallback when fetch returns true', async() => {

    
    const wasCheckOk = await checkService.execute('https://google.com')
    expect( wasCheckOk ).toBe( true );
    expect( successCallback ).toHaveBeenCalled()
    expect( errorCallback ).not.toHaveBeenCalled()

    expect(mockRepository.saveLog).toBeCalledWith(
      expect.any( LogEntity )
    )

    
  });

  test('should call errorCallback when fetch returns false', async() => {

    
    const wasCheckOk = await checkService.execute('https://asdasdasdasdasdasdasd.com')
    expect( wasCheckOk ).toBe( false );
    expect( successCallback ).not.toHaveBeenCalled()
    expect( errorCallback ).toHaveBeenCalled()

    expect(mockRepository.saveLog).toBeCalledWith(
      expect.any( LogEntity )
    )

    
  });
});
