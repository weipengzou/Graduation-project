import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Injectable,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import {
  ApiBasicAuth,
  ApiBearerAuth,
  ApiOperation,
  ApiProperty,
  ApiTags,
} from '@nestjs/swagger'
import { JwtService } from '@nestjs/jwt'
import { LoginDto, RegisterDto } from '../../dto'
import { InjectModel } from 'nestjs-typegoose'
import { User } from 'src/models/user.model'
import { ReturnModelType } from '@typegoose/typegoose'

@ApiTags('验证')
@Controller('auth')
export class AuthController {
  constructor(
    @InjectModel(User) private userModel: ReturnModelType<typeof User>,
    private jwtService: JwtService,
  ) {}
  @Post('register')
  @ApiOperation({ summary: '注册' })
  async register(@Body() registerDto: RegisterDto) {
    console.log(registerDto)

    let user = await this.userModel.findOne({
      account: registerDto.account,
    })
    if (user) {
      throw new BadRequestException('用户已存在')
    } else {
      let user = this.userModel.create(registerDto)
      return user
    }
  }
  @Post('login')
  @ApiOperation({ summary: '登录' })
  @UseGuards(AuthGuard('local1'))
  async login(@Body() body: LoginDto, @Req() req) {
    // console.log('body', body);
    return {
      user: req.user,
      token: this.jwtService.sign(String(req.user._id)),
    }
  }
}
