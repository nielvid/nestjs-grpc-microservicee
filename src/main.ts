import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';
import { join } from 'path';

async function bootstrap() {
  const options: MicroserviceOptions = {
    transport: Transport.GRPC, // Use Transport.GRPC for gRPC
    options: {
      url: 'localhost:5000',
      protoPath: join(__dirname, '../src/proto/user.proto'),
      package: 'user_service',
    },
  };
  const app = await NestFactory.create(AppModule);
  app.connectMicroservice(options);

  await app.startAllMicroservices();
  await app.listen(3000);
}
bootstrap();
