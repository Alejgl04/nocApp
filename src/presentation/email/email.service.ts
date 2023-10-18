import nodemailer from 'nodemailer'
import { envs } from '../../config/plugins/envs.plugin'
import { LogRepository } from '../../domain/repository/log.repository';
import { LogEntity, LogSeveretyLevel } from '../../domain/entities/log.entity';

interface SendMailOptions {
  to: string | string[];
  subject: string;
  htmlBody: string;
  attachements?: Attachment[] 
}

interface Attachment {
  filename: string;
  path: string;
}

// TODO !!attachemtns

export class EmailService {

  private transporter = nodemailer.createTransport({
    service: envs.MAILER_SERVICE,
    auth: {
      user: envs.MAILER_EMAIL,
      pass: envs.MAILER_SECRET_KEY,
    }
    
  });

  constructor(
    private readonly logRepository: LogRepository
  ){}

  async sendEmail( options: SendMailOptions ): Promise<boolean> {

    const {to, subject, htmlBody, attachements = []} = options;


    try {
      const sendInformation = await this.transporter.sendMail({
        to: to,
        subject: subject,
        html: htmlBody,
        attachments: attachements
      });

      const log = new LogEntity({
        level: LogSeveretyLevel.low,
        message: 'Email Sent',
        origin: 'email.services.ts'
      });

      this.logRepository.saveLog(log);
      return true;

    } catch (error) {
      console.log(error);

      const log = new LogEntity({
        level: LogSeveretyLevel.high,
        message: 'Email Sent',
        origin: 'email.services.ts'
      });

      return false
    }
  }

  async sendEmailWithFileSystemLogs(to: string | string[]) {
    const subject = 'Services Log';
    const htmlBody = `
      <h3>Cron Reports services</h3>
      <p>Testing...</p>
      <p>See Reports</p>
    `;

    const attachements: Attachment[] = [
      { filename: 'logs-all.log', path: './logs/logs-all.log'},
      { filename: 'logs-high.log', path: './logs/logs-high.log'},
      { filename: 'logs-medium.log', path: './logs/logs-medium.log'},
    ]

    return this.sendEmail({
      to, subject, attachements, htmlBody
    })
  }

}