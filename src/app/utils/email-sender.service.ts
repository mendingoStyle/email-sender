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
      host: 'smtpi.kinghost.net:465:0',
      port: 587 ,
      service: 'kinghost',
      secure: false,
      auth: {
        user: 'luiz.junior@globalsys.com.br',
        pass: 'lj22ac*22'
      },

    });

    const mailOptions = {
      from: 'luiz.junior@globalsys.com.br',
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