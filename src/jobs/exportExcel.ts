import Queue from 'bull';
import redisConfig from '../../redis/config';
import { createTransport } from 'nodemailer';
import { Transaction } from '@prisma/client';
import { Parser } from 'json2csv';
import Mail from 'nodemailer/lib/mailer';

export const exportQueue = new Queue('exportExcel', { redis: redisConfig });

interface Data {
  email: string;
  transactions: Transaction[];
}

exportQueue.process(async (job: Queue.Job<Data>, done) => {
  try {
    const transporter = createTransport({
      service: 'gmail',
      auth: {
        user: process.env.SECRET_EMAIL,
        pass: process.env.SECRET_PASSWORD,
      },
    });

    const json2csvParser = new Parser();

    const csv = json2csvParser.parse(job.data.transactions);

    const mailOptions: Mail.Options = {
      from: process.env.SECRET_PASSWORD,
      to: job.data.email,
      subject: 'Sql node project excel export',
      text: 'the following attachment has your transactions',
      attachments: [{ filename: 'transactions.csv', content: csv }],
    };

    await transporter.sendMail(mailOptions);

    done();
  } catch (err: any) {
    done(new Error(err.response));
  }
});
