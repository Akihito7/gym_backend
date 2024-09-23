import { Injectable } from "@nestjs/common";
import nodemailer from 'nodemailer';
import { SendEmailDTO } from "./dtos/send-email.DTO";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class EmailService {
  private transporter;

  constructor(private readonly configService : ConfigService) {
    this.transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465, 
      secure: true,
      auth: {
        user: this.configService.get<string>("EMAIL"), 
        pass: this.configService.get<string>("PASSWORD_EMAIL"), 
      },
    });
  }

  async sendEmail({ to, subject, text }: SendEmailDTO) {
    const mailOptions = {
      from: `AkihitoGym" <${this.configService.get<string>("EMAIL")}>`,
      to,
      subject,
      text,
    };
    try {
      return this.transporter.sendMail(mailOptions);
    } catch (error) {
      throw new Error('Não foi possível enviar o e-mail');
    }
  }
}
