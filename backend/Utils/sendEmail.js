const nodemailer = require("nodemailer")

module.exports.sendEmail = async options => {

    const {
        SMTP_HOST,
        SMTP_PORT,
        SMTP_EMAIL, 
        SMTP_PASSWORD,
        SMTP_FROM_EMAIL,
        SMTP_FROM_NAME
    } = process.env


    const transport = nodemailer.createTransport({
        
        host: SMTP_HOST,
        port: SMTP_PORT,
        auth: {
          user: SMTP_EMAIL,
          pass: SMTP_PASSWORD
        }
      });

      const message = {
        from:`${SMTP_FROM_NAME} < ${SMTP_FROM_EMAIL}`,
        to: options.email,
        subject: options.subject,
        text: options.message
      }

      await transport.sendMail(message)

}