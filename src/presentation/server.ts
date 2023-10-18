import { CheckService } from '../domain/use-cases/checks/check-service';
import { FileSystemDatasource } from '../infrastructure/datasources/file-system.datasource';
import { LogRepositoryImpl } from '../infrastructure/repositories/log.repository.impl';
import { CronService } from './cron/cron-service';
import { EmailService } from './email/email.service';

const fileSystemLogRepository = new LogRepositoryImpl(
  new FileSystemDatasource(),
);


export class Server {

  public static start() {
    console.log('Server started...');

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

    // const emailService = new EmailService();
    // emailService.sendEmailWithFileSystemLogs([
    //   'alejo.jesus.magne@gmail.com'
    // ]);

    // CronService.createJob(
    //   '*/5 * * * * *',
    //   () => {
    //     const url = 'https://google.com';
    //     new CheckService(
    //       fileSystemLogRepository,

    //       () => console.log(`${url} is ok`),
    //       (error: any) => console.log( error )
        
    //       ).execute( url );
    //     // new CheckService().execute('http://localhost:3000');
    //   }
    // );
  }
}