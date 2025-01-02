import { Global, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot(),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('API_TOKEN_KEY_VALUE'),
        signOptions: {},
      }),
      inject: [ConfigService],
    }),
  ],
  exports: [JwtModule], // Exporta JwtModule para usar en otros módulos
})
export class JwtConfigModule {}
