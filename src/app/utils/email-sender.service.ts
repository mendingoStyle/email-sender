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
    console.log('oi')
    const body = senderDto.body_email
    const transporter = createTransport({
      host: 'smtp-mail.outlook.com',
      port: 587 ,

      secure: false,
      auth: {
        user: 'now_adm@outlook.com',
        pass: 'SystemNowPassword123'
      },

    });

    const mailOptions = {
      from: 'now_adm@outlook.com',
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
    console.log('xau')
    return { message: senderDto.messageAccept }
  }
}