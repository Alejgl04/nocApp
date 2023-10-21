import { CheckService } from '../domain/use-cases/checks/check-service';
import { CheckServiceMultiple } from '../domain/use-cases/checks/check-service-multiple.service';
import { SendEmailLogs } from '../domain/use-cases/email/send-email.logs';
import { FileSystemDatasource } from '../infrastructure/datasources/file-system.datasource';
import { MongoLogDatasource } from '../infrastructure/datasources/mongo-log.datasource';
import { PostgresLogDatasource } from '../infrastructure/datasources/postgres-log.datasource';
import { LogRepositoryImpl } from '../infrastructure/repositories/log.repository.impl';
import { CronService } from './cron/cron-service';
import { EmailService } from './email/email.service';

const fsLogRepository = new LogRepositoryImpl(
  new FileSystemDatasource(),

);
const mongoLogRepository = new LogRepositoryImpl(
  new MongoLogDatasource(),
);
const postgresLogRepository = new LogRepositoryImpl(
  new PostgresLogDatasource(),
);

const emailService = new EmailService();

export class Server {


  public static start() {
    console.log('Server started...');


    // new SendEmailLogs(
    //   emailService,
    //   fileSystemLogRepository
    // ).execute(
    //   [
    //     'alejo.jesus.magne@gmail.com'
    //   ]
    // )

    // const emailService = new EmailService();
    // emailService.sendEmail({
    //   to: 'alejo.jesus.magne@gmail.com',
    //   subject: 'Cron Logs Reports',
    //   htmlBody: `
    //     <h3>Cron Reports services</h3>
    //     <p>Testing...</p>
    //     <p>See Reports</p>
    //   `
    // });

    // emailService.sendEmailWithFileSystemLogs([
    //   'alejo.jesus.magne@gmail.com'
    // ]);

    // CronService.createJob(
    //   '*/5 * * * * *',
    //   () => {
    //   const url = 'https://google.com';
    //   new CheckServiceMultiple(
    //     [fsLogRepository, mongoLogRepository,postgresLogRepository],

    //     () => console.log(`${url} is ok`),
    //     (error: any) => console.log( error )
      
    //     ).execute( url );
    //   }
    // );
  }
}