// import { Injectable } from '@nestjs/common';
// import { MailerService } from '@nestjs-modules/mailer';

// @Injectable()
// export class EmailService {
//   constructor(private readonly mailerService: MailerService) {}

//   sendEmail() {
//     this.mailerService.sendMail({
//       to: 'qiulaoshu1994@163.com',
//       from: '421419567@qq.com',
//       // subject: 'Testing Nest MailerModule ✔',
//       subject: 'Walker Lee Love You ✔',
//       // html: '<b>Welcome Frost!</b>',
//       template: 'email', // 采用 email.ejs这个模板
//     });
//   }
// }

import { Injectable } from '@nestjs/common';
import { InjectMailer, Mailer, template } from 'nestjs-mailer';
import { resolve } from 'path';

@Injectable()
export class EmailService {
  constructor(@InjectMailer() private readonly mailerService: Mailer) {}

  sendEmail(toMaile) {
  return this.mailerService
      .sendMail({
        // to: 'qiulaoshu1994@163.com',
        to: toMaile,
        from: '421419567@qq.com',
        subject: 'Testing Nest MailerModule ✔',
        text: 'Hello John',
        html: template(resolve(__dirname, '../views/email.ejs'), {
          name: 'John',
        }),
      })
      .then(res => {
        return res;
      }).catch(err =>{
        console.log(err)
        return err.response;
      });
  }
}
