import nodemailer, { SentMessageInfo } from 'nodemailer';
import { resolve } from 'path';
import exphbs from 'express-handlebars';
import nodemailerhbs from 'nodemailer-express-handlebars';

import mailConfig from '../config/mail';

class Mail {
  public transporter = nodemailer.createTransport({
    host: mailConfig.host,
    port: mailConfig.port,
    secure: mailConfig.secure,
    auth: mailConfig.auth.user ? mailConfig.auth : null,
  });

  constructor() {
    this.configureTemplates();
  }

  public sendMail(message: any): Promise<SentMessageInfo> {
    return this.transporter.sendMail({
      ...mailConfig.default,
      ...message,
    });
  }

  configureTemplates() {
    const viewPath = resolve(__dirname, '..', 'app', 'views', 'emails');
    this.transporter.use('compile', nodemailerhbs({
      viewEngine: exphbs.create({
        layoutsDir: resolve(viewPath, 'layouts'),
        partialsDir: resolve(viewPath, 'partials'),
        defaultLayout: 'default',
        extname: '.hbs',
      }),
      viewPath,
      extName: '.hbs',
    }));
  }
}

export default new Mail();
