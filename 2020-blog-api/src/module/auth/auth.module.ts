import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypegooseModule } from 'nestjs-typegoose';
import { User } from 'src/models/user.model';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy ';
import { LocalStrategy } from './local.strategy';

// 策略注册

@Module({
  imports: [PassportModule, TypegooseModule.forFeature([User], 'blog')],
  controllers: [AuthController],
  providers: [LocalStrategy, JwtStrategy],
})
export class AuthModule {}
