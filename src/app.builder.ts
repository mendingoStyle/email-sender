import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { json } from 'express'

import { AppModule } from './app.module'

export async function appBuilder() {
  const app = await NestFactory.create(AppModule)
  app.enableCors()
  app.use(json({ limit: '50mb' }))
  process.env.NODE_ENV === 'production' &&
    app.useGlobalFilters(
   
    )
  app.useGlobalPipes(new ValidationPipe({ transform: true }))

  return app
}
