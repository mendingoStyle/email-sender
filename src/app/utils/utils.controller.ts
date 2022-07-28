import { Controller, Post, Headers, UseGuards, Body } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { EmailSenderDto } from './dto/emailSender.dto'
import { EmailSenderService } from './email-sender.service'


@ApiTags('Utils')
@Controller('utils')
export class UtilsController {
  constructor(private readonly service: EmailSenderService) { }

  @Post('send-email')
  refresh(
    @Body() dto: EmailSenderDto
  ): Promise<{ message: string } | {}> {
    return this.service.sender(dto)
  }
}