import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { EmailSenderDto } from "./dto/emailSender.dto";
import { createTransport } from 'nodemailer'

@Injectable()
export class EmailSenderService {
  constructor(
    private config: ConfigService,
  ) { }
  async sender(
    senderDto: EmailSenderDto,
  ): Promise<{ message: string } | {}> {
    const body = senderDto.body_email
    const transporter = createTransport({
      host: this.config.get('HOST_EMAIL'),
      port: parseInt(this.config.get('PORT_EMAIL')),
      secure: this.config.get('SECURE_EMAIL'),
      auth: {
        user: this.config.get('EMAIL'),
        pass: this.config.get('PASSWORD_EMAIL')
      },
    });

    const mailOptions = {
      from: this.config.get('EMAIL'),
      to: senderDto.email_destiny,
      subject: senderDto.subject,
      html: body
    };

    const promise: boolean = await new Promise(async (resolve, reject) => {
      return transporter.sendMail(mailOptions,
        async function (error, info) {
          if (error) {
            console.log(error)
            resolve(false);
          } else {
            resolve(true)
          }
        }
      );
    })

    if (!promise) {
      return { message: 'Não foi possível enviar email' }
    }

    return { message: senderDto.messageAccept }
  }
}