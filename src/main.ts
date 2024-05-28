import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config =new DocumentBuilder()
  .setTitle("Gestion des creches")
  .setDescription("projet PFE")
  .addTag("users")
  .addTag("auth")
  .addTag("categories")
  .addTag("children")
  .addTag("situations")
  .addTag("activities")
  .addTag("personels")
  .addBearerAuth({
    description:"ACCESSTOKEN",
    name:"Athorization",
    scheme:"Bearer",
    type:"http",
    in:"Header"
  },
  'access-token'
  )
  .addBearerAuth({
    description:"REFRESHTOKEN",
    name:"Athorization",
    scheme:"Bearer",
    type:"http",
    in:"Header"
  }, 'refresh-token'
  )
  .build()

  const document=SwaggerModule.createDocument(app, config)
  SwaggerModule.setup("api", app, document)
  app.enableCors();
  await app.listen(3000);
}
bootstrap();
