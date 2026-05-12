const nodemailer = require("nodemailer");
const pug = require("pug");
const { convert } = require("html-to-text");

module.exports = class Email {
  constructor(user) {
    console.log(user);
    this.to = user.email;
    this.name = user.name;
    this.applicationNo = user.applicationNo;
    this.from = `Maduka University College  <college@madukauniversity.edu.ng>`;
  }

  newTransport() {
    if (process.env.NODE_ENV === "production") {
      //Google transporter
      return nodemailer.createTransport({
        service: process.env.GMAIL_HOST,
        auth: {
          user: process.env.GOOGLE_APP_USER,
          pass: process.env.GOOGLE_APP_PASSWORD,
        },
      });
    }
    //Mailtrap transporter
    return nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  }

  async send(template, subject) {
    const html = pug.renderFile(
      `${__dirname}/../views/emails/${template}.pug`,
      {
        name: this.name,
        subject: this.subject,
        applicationNo: this.applicationNo,
      },
    );

    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      html,
      text: convert(html),
    };
    await this.newTransport().sendMail(mailOptions);
  }

  async sendApplication() {
    await this.send("application", "Application to Maduka University College");
  }
  async sendAdmission() {
    await this.send("admission", "Admission to Maduka University College");
  }
  async sendRejection() {
    await this.send(
      "rejection",
      "Application Rejection from Maduka University College",
    );
  }
  async sendContact() {
    await this.send(
      "contact",
      "New Contact Message from Maduka University College",
    );
  }
  async sendReset() {
    await this.send(
      "passwordReset",
      "Password Reset Token: Valid for 10 Minutes",
    );
  }
};
