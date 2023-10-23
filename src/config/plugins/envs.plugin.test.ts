import { envs } from "./envs.plugin";


describe('envs.plugin.ts', () => {
  
  test('should return envs options', () => {


    expect(envs).toEqual({
      PORT: 3000,
      MAILER_SERVICE: 'gmail',
      MAILER_EMAIL: 'aguerrerodev.web@gmail.com',
      MAILER_SECRET_KEY: 'daefbqrcrryswudw',
      PROD: false,
      MONGO_URL: 'mongodb://alejandro:123456789@localhost:27017',
      MONGO_DB_NAME: 'NOC-TEST',
      MONGO_USER: 'alejandro',
      MONGO_PASS: '123456789',
      POSTGRES_URL: 'postgresql://postgres:123456789@localhost:5432/NOC',
      POSTGRES_USER: 'postgres',
      POSTGRES_DB: 'NOC-TEST',
      POSTGRES_PASSWORD: '123456789'
    })
    
  });

  test('should return error if not found envs', async() => {
    jest.resetModules();
    process.env.PORT = 'ABC';

    try {
      await import('./envs.plugin');
      expect(true).toBe(false);
    } catch (error) {
      
      expect(`${error}`).toContain('"PORT" should be a valid integer')
      
    }
  })

});
