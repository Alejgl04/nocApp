import mongoose from "mongoose";
import { envs } from "../../config/plugins/envs.plugin";
import { LogModel, MongoDatabase } from "../../data/mongoDB";
import { MongoLogDatasource } from "./mongo-log.datasource";
import { LogEntity, LogSeveretyLevel } from "../../domain/entities/log.entity";


describe('Testing mongo-log.datasource', () => {
  const logDataSource = new MongoLogDatasource();
  
  const log = new LogEntity({
    message: 'testing-message',
    level: LogSeveretyLevel.low,
    origin: 'mongo-log-test'
  });

  beforeAll( async() => {

    await MongoDatabase.connect({
      dbName: envs.MONGO_DB_NAME,
      mongoUrl: envs.MONGO_URL
    });

  })
  afterEach( async() => {
    await LogModel.deleteMany();
  })

  afterAll( async() => {

    mongoose.connection.close();
  })

  test('should create a log', async() => {
    
    const logSpy = jest.spyOn(console, 'log');


    await logDataSource.saveLog(log)

    expect(logSpy).toHaveBeenCalled()
    expect(logSpy).toHaveBeenCalledWith( "mongo log created:", expect.any(String))
    
  });


});
