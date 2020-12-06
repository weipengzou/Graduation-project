import { modelOptions, Prop } from '@typegoose/typegoose'
import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty } from 'class-validator'
import { hashSync } from 'bcryptjs'

@modelOptions({ schemaOptions: { collection: 'user' } })
export class User {
  @ApiProperty({ description: '手机号', example: '123' })
  @IsNotEmpty({ message: '请输入账号' })
  @Prop({
    select: true,
  })
  account: string
  @ApiProperty({ description: '密码', example: '123' })
  @IsNotEmpty({ message: '请输入密码' })
  @Prop({
    select: false,
    get: val => val,
    set: val => (val ? hashSync(val) : val),
  })
  password: string
}
