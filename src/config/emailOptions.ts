// import { EjsAdapter } from '@nestjs-modules/mailer/dist/adapters/ejs.adapter';
// import { resolve } from 'path';
// import { registerAs } from '@nestjs/config'; // 配置命名空间

// export default registerAs('email', () => ({
//   transport: 'smtps://421419567@qq.com:obxcugjwrnenbggh@smtp.qq.com',
//   defaults: {
//     from: '"nest-modules" <modules@nestjs.com>',
//   },
//   template: {
//     dir: resolve(__dirname, '../template'),
//     adapter: new EjsAdapter(),
//     options: {
//       strict: true,
//     },
//   },
// }));
import { registerAs } from '@nestjs/config'; // 配置命名空间

export default registerAs('emailOptions', () => ({
  transport: 'smtps://421419567@qq.com:obxcugjwrnenbggh@smtp.qq.com',
}));
