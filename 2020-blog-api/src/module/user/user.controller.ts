import {
  Body,
  Controller,
  Get,
  Header,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBasicAuth,
  ApiBearerAuth,
  ApiHeader,
  ApiHeaders,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { InjectModel } from 'nestjs-typegoose';
import { User } from '../../models/user.model';
import { Crud } from 'nestjs-mongoose-crud';
import { UserDto } from '../../dto/user.dto';
import { ReturnModelType } from '@typegoose/typegoose';
import { AuthGuard } from '@nestjs/passport';

// @Crud({
//   model: UserSchema,
//   routes: {
//     find: {
//       sort: { _id: -1 },

//       decorators: [ApiOperation({ summary: '查找用户' })],
//     },
//     findOne: {
//       decorators: [ApiOperation({ summary: '查找一个用户' })],
//     },
//     create: {
//       dto: UserSchema,
//       decorators: [ApiOperation({ summary: '创建用户' })],
//     },
//     update: {
//       dto: UserSchema,
//       decorators: [ApiOperation({ summary: '更新用户' })],
//     },
//     delete: {
//       decorators: [ApiOperation({ summary: '删除用户' })],
//     },
//   },
// })

@ApiTags('用户')
@Controller('user')
export class UserController {
  constructor(
    @InjectModel(User) private readonly userModel: ReturnModelType<typeof User>,
  ) {}
  @Get('')
  @ApiOperation({ summary: '获取用户信息' })
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  async getUser(@Req() req) {
    return req.user;
  }
  @Get('userAll')
  @ApiOperation({ summary: '查询所有用户' })
  async fetchUser() {
    return await this.userModel.find();
  }
  @Put()
  @ApiOperation({ summary: '更新用户信息' })
  @UseGuards(AuthGuard('jwt'))
  async update(@Body() userDto: UserDto, @Req() req) {
    return {
      beforUser: req.user,
      updateUser: userDto,
    };
  }
}
