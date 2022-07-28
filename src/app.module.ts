import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { UtilsModule } from './app/utils/utils.module'


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UtilsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
