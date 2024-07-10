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
import { Invoice } from './modules/invoice/entities/invoice.entity';
import { Auth } from './modules/auth/entities/auth.entity';
import Business from './modules/user/entities/business.entity';
import { JwtModule } from '@nestjs/jwt';
import jwtConfig, { JwtConfig } from './config/jwt.config';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [databaseConfig, jwtConfig],
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
        entities: [User, Invoice, Auth, Business],
        synchronize: true,
        // logging: true,
      }),
    }),
    JwtModule.registerAsync({
      global: true,
      inject: [ConfigService],
      useFactory: (config: ConfigService<JwtConfig>) => {
        const secret = config.get('secret');
        return {
          global: true,
          secret,
          signOptions: { expiresIn: 86400 },
        };
      },
    }),
    UserModule,
    AuthModule,
    InvoiceModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
