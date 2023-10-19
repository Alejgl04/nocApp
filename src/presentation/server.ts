import { CheckService } from '../domain/use-cases/checks/check-service';
import { SendEmailLogs } from '../domain/use-cases/email/send-email.logs';
import { FileSystemDatasource } from '../infrastructure/datasources/file-system.datasource';
import { MongoLogDatasource } from '../infrastructure/datasources/mongo-log.datasource';
import { LogRepositoryImpl } from '../infrastructure/repositories/log.repository.impl';
import { CronService } from './cron/cron-service';
import { EmailService } from './email/email.service';

const LogRepository = new LogRepositoryImpl(
  // new FileSystemDatasource(),
  new MongoLogDatasource(),
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
    //   new CheckService(
    //     LogRepository,

    //     () => console.log(`${url} is ok`),
    //     (error: any) => console.log( error )
      
    //     ).execute( url );
    //   }
    // );
  }
}