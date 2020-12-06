// main入口文件
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import * as mongoose from 'mongoose'
import { NestExpressApplication } from '@nestjs/platform-express'
import { ValidationPipe } from '@nestjs/common'
import * as fs from 'fs'
//https
const httpsOpts = {
  key: fs.readFileSync(
    __dirname + '/../../../../../etc/nginx/ssl/3894636_www.zwp1.top.key',
  ),
  cert: fs.readFileSync(
    __dirname + '/../../../../../etc/nginx/ssl/3894636_www.zwp1.top.pem',
  ),
}
async function bootstrap() {
  // 零散配置
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    httpsOptions: httpsOpts,
  })
  // 开启跨域
  app.enableCors()
  // 验证管道
  app.useGlobalPipes(new ValidationPipe())
  const options = new DocumentBuilder()
    .setTitle('2020_blog_api')
    .setDescription('2020博客接口')
    .setVersion('1.0')
    .addBearerAuth()
    .build()
  const document = SwaggerModule.createDocument(app, options)
  SwaggerModule.setup('doc', app, document)
  await app.listen(3000)
  console.log('3000端口已开启https服务')
  // await app.listen(3000) // https 3000
  // http.createServer(server).listen(3009) // http 3009
}
bootstrap()
