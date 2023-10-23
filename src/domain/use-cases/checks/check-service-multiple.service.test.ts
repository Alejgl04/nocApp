import { LogEntity } from "../../entities/log.entity";
import { CheckServiceMultiple } from "./check-service-multiple.service";


describe('checkService Test', () => {
  
  const mockRepository1 = {
    saveLog: jest.fn(),
    getLogs: jest.fn(),
  }

  const mockRepository2 = {
    saveLog: jest.fn(),
    getLogs: jest.fn(),
  }

  const mockRepository3 = {
    saveLog: jest.fn(),
    getLogs: jest.fn(),
  }

  const successCallback = jest.fn();
  const errorCallback = jest.fn();

  const checkServiceMultiple = new CheckServiceMultiple(
    [mockRepository1, mockRepository2, mockRepository3],
    successCallback,
    errorCallback
  );

  beforeEach(() => {
    jest.clearAllMocks();
  })

  test('should call successCallback when fetch returns true', async() => {

    
    const wasCheckOk = await checkServiceMultiple.execute('https://google.com')
    expect( wasCheckOk ).toBe( true );
    expect( successCallback ).toHaveBeenCalled()
    expect( errorCallback ).not.toHaveBeenCalled()

    expect(mockRepository1.saveLog).toBeCalledWith( expect.any( LogEntity ) )
    expect(mockRepository2.saveLog).toBeCalledWith( expect.any( LogEntity ) )
    expect(mockRepository3.saveLog).toBeCalledWith( expect.any( LogEntity ) )

  });

  test('should call errorCallback when fetch returns false', async() => {

    
    const wasCheckOk = await checkServiceMultiple.execute('https://asdasdasdasdasdasdasd.com')
    expect( wasCheckOk ).toBe( false );
    expect( successCallback ).not.toHaveBeenCalled()
    expect( errorCallback ).toHaveBeenCalled()

    expect(mockRepository1.saveLog).toBeCalledWith(expect.any( LogEntity ))
    expect(mockRepository2.saveLog).toBeCalledWith(expect.any( LogEntity ))
    expect(mockRepository3.saveLog).toBeCalledWith(expect.any( LogEntity ))

    
  });
});
