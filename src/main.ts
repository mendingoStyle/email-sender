import { ConfigService } from '@nestjs/config'


import { appBuilder } from './app.builder'

import { INestApplication, Logger } from '@nestjs/common'

async function bootstrap() {
  const app = await appBuilder()
  const configService = app.get(ConfigService)
  const port = configService.get('APP_PORT')

  await app.listen(port, () =>
    Logger.log(
      `Listening for API calls on port \x1b[33m${port} 💻\x1b[37m`,
      'NestApplication'
    )
  )

  return app
}

bootstrap().then((app: INestApplication) => {
  process.env.NODE_ENV === 'production' 
})
