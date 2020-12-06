import { BadRequestException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ReturnModelType } from '@typegoose/typegoose'
import { InjectModel } from 'nestjs-typegoose'
import { IStrategyOptions, Strategy } from 'passport-local'
import { User } from 'src/models/user.model'
import { compareSync } from 'bcryptjs'

export class LocalStrategy extends PassportStrategy(Strategy, 'local1') {
  constructor(
    @InjectModel(User) private userModedl: ReturnModelType<typeof User>,
  ) {
    super({
      usernameField: 'account',
      passwordField: 'password',
    } as IStrategyOptions)
  }
  async validate(account: string, password: string) {
    let user = await this.userModedl.findOne({ account }).select('password')
    if (!user) {
      throw new BadRequestException({
        statusCode: 404,
        msg: '用户名不存在',
      })
    } else if (compareSync(password, user.password)) return user
    else {
      throw new BadRequestException({
        statusCode: 404,
        msg: '用户名或密码错误',
      })
    }
  }
}
