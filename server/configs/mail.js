// /**
//  * Created by 15R on 2/5/2016.
//  */
// import nodemailer from 'nodemailer';
// import serverConfig from './server.config';
// // const privateKey = serverConfig.key.privateKey;
// // console.log(serverConfig.server.host);
// // create reusable transport method (opens pool of SMTP connections)
// const smtpTransport = nodemailer.createTransport(`smtps://${serverConfig.email.username}%40gmail.com:${serverConfig.email.password}@smtp.gmail.com`);
//
//
// const mail = (mailOptions) => {
//   smtpTransport.sendMail(mailOptions, () => {
//     // if (error) {
//     //   console.error(error);
//     // }
//     // console.log(response);
//     smtpTransport.close(); // shut down the connection pool, no more messages
//   });
// };
//
// exports.sentMailVerificationLink = (user, token) => {
//   const _from = `${serverConfig.email.accountName} <${serverConfig.email.username}@gmail.com>'`;
//   let mailbody = `<p>Thank you for registering at${serverConfig.email.accountName}</p>`;
//   mailbody += `<p>Please confirm your account at this link:<br/><a href='${serverConfig.server.host$}/${serverConfig.email.verifyEmailUrl}/${token}'>Verify Link</a></p>`;
//
//   const mailOptions = {
//     from: _from, // sender address
//     to: user.email, // list of receivers
//     subject: 'Verify account at www.crowdbam.com', // Subject line
//     // text: result.price, // plaintext body
//     html: mailbody,  // html body
//   };
//   mail(mailOptions);
// };
// exports.sendMailResetPassword = (user, token) => {
//   const _from = `${serverConfig.email.accountName} <${serverConfig.email.username}@gmail.com>`;
//   let mailbody = '<p>You are receiving this email because you (or someone else) required to be reset your password.</p>';
//   mailbody += `<p>Please click this link to excute:<br/><a href='${serverConfig.server.host}/${serverConfig.email.resetPasswordUrl}/${token}>Link Reset Password</a></p>`;
//   mailbody += '<p>If you did not request this, please ignore the email and password will remain the same.</p>';
//   const mailOptions = {
//     from: _from, // sender address
//     to: user.email, // list of receivers
//     subject: 'Change password at www.crowdbam.com', // Subject line
//     // text: result.price, // plaintext body
//     html: mailbody,  // html body
//   };
//   mail(mailOptions);
// };
// exports.sendMailDoneResetPassword = (user) => {
//   const _from = `${serverConfig.email.accountName} <${serverConfig.email.username}@gmail.com>`;
//   const mailbody = `<p>This is the email to confirm that the account ${user.username} has changed password.</p>`;
//   const mailOptions = {
//     from: _from, // sender address
//     to: user.email, // list of receivers
//     subject: 'Change password done at www.crowdbam.com', // Subject line
//     // text: result.price, // plaintext body
//     html: mailbody,  // html body
//   };
//   mail(mailOptions);
// };
//
