import { Global, Module } from '@nestjs/common'
import { EmailSenderService } from './email-sender.service'
import { UtilsController } from './utils.controller'


@Module({
  controllers: [UtilsController],
  providers: [EmailSenderService],
  exports: [EmailSenderService],
})
export class UtilsModule { }
