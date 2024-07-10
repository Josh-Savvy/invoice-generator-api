import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { InvoiceModule } from './modules/invoice/invoice.module';
import databaseConfig, { DatabaseConfig } from './config/database.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './modules/user/entities/user.entity';
import Client from './modules/user/entities/client.entity';
import { Invoice } from './modules/invoice/entities/invoice.entity';
import { Auth } from './modules/auth/entities/auth.entity';
@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      load: [databaseConfig],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService<DatabaseConfig>) => ({
        type: 'postgres',
        host: configService.get('host'),
        port: +configService.get('port'),
        username: configService.get('user'),
        password: configService.get('password'),
        database: configService.get('database'),
        entities: [User, Client, Invoice, Auth],
        synchronize: true,
        // logging: true,
      }),
    }),
    UserModule,
    AuthModule,
    InvoiceModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
