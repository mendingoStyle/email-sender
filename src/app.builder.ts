import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { json } from 'express'
import { LogExceptionFilter } from '@hialves-gbs/globalsys-modules'

import { AppModule } from './app.module'

export async function appBuilder() {
  const app = await NestFactory.create(AppModule)
  app.enableCors()
  app.use(json({ limit: '50mb' }))
  process.env.NODE_ENV === 'production' &&
    app.useGlobalFilters(
      new LogExceptionFilter('typeorm', 'commondb_write', 'log', {
        enabledConsoleLog: true,
      })
    )
  app.useGlobalPipes(new ValidationPipe({ transform: true }))

  return app
}
