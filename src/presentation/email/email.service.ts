import nodemailer from 'nodemailer'
import { envs } from '../../config/plugins/envs.plugin'

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

  constructor(){}

  async sendEmail( options: SendMailOptions ): Promise<boolean> {

    const {to, subject, htmlBody, attachements = []} = options;


    try {
      const sendInformation = await this.transporter.sendMail({
        to: to,
        subject: subject,
        html: htmlBody,
        attachments: attachements
      });
      return true;

    } catch (error) {
      console.log(error);

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