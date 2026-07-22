import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
  host: 'smtp.sendgrid.net',
  port: 587,
  secure: false, // true for port 465
  auth: {
    user: 'apikey', // this is literally the string 'apikey'
    pass: process.env.SENDGRID_API_KEY // your SendGrid API key
  }
});

const sendEmail = async ({ to, subject, text, html }) => {
  const msg = {
    from: process.env.EMAIL_USER, // must be a verified sender in SendGrid
    to,
    subject,
    text,
    html
  };

  try {
    const info = await transporter.sendMail(msg);
    console.log('Email sent successfully:', info.messageId);
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};

export default sendEmail;
