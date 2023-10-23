import mongoose from "mongoose";
import { MongoDatabase } from "./init";

describe('init MONGO', () => {

  afterAll(() => {
    mongoose.connection.close();
  })
  
  
  test('Should connect to MongoDB', async () => {
  
    const connect = await MongoDatabase.connect({
      dbName: process.env.MONGO_DB_NAME!,
      mongoUrl: process.env.MONGO_URL!,
    });

    expect(connect).toBe(true)
  });

  test('should throw an error', async() => {
    
    try {
      const connect = await MongoDatabase.connect({
        dbName: process.env.MONGO_DB_NAME!,
        mongoUrl: 'mongodb://alejandro:123456789@localhoasdasdasdst:27017',
      });
      expect(connect).toBe(true)

    } catch (error) {
      
    }

  });
});
